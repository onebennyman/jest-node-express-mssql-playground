const express = require('express');
const jsonContentTypeMiddleware = require('./middleware/jsonContentType');

const app = express();

// Agrega el middleware
app.use(jsonContentTypeMiddleware);
// Rutas web
app.use('/file/upload', require('./router/fileUpload'));

module.exports = app;
