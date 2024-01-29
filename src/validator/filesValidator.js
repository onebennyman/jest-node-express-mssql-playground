const singleFileValidator = ((req) => {
  const hasFiles = !!req.files && Object.keys(req.files).length === 1;
  return hasFiles;
});
// Middleware para validación
const validarConsulta = [];

module.exports = { validarConsulta, singleFileValidator };
