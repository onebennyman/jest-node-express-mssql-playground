const singleFileValidator = ((req) => {
  const hasFiles = !!req.files && Object.keys(req.files).length === 1;

  if (!hasFiles) throw new Error('Se requiere un único archivo.');
  return hasFiles;
});

// Middleware para validación
const validarConsulta = [];

module.exports = { validarConsulta, singleFileValidator };
