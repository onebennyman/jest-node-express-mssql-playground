const express = require('express');
const { singleFileValidator } = require('../validator/filesValidator');
const { extractFileCreateObject } = require('../utils/extractores');
const FileDir = require('../sequelize/models/fileDir');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send());

router.post('/', async (req, res) => {
  const validacion = singleFileValidator(req);
  if (validacion === false) { return res.status(404).send(); }

  const datosParaCrear = extractFileCreateObject(req);
  try {
    const [fileDir, created] = await FileDir.findOrCreate({
      where: { md5: datosParaCrear.md5 }, // Condición para buscar la fila
      defaults: datosParaCrear, // Datos para crear si no se encuentra
    });
    if (!created && !(fileDir.fileName || '').includes(datosParaCrear.fileName)) {
      fileDir.fileName = (fileDir.fileName || '').length > 0
        ? `${fileDir.fileName}, ${datosParaCrear.fileName}`
        : datosParaCrear.fileName;
      if (!fileDir.md5) return res.status(500).send({ error: `El md5 encontrado no es válido ${fileDir.md5}` });
      await fileDir.update(fileDir);
    }
    return res.status(200).send({ status: 'OK', fileDir });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
