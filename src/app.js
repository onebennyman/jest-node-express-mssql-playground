const express = require('express');

const app = express();

// Rutas web
app.use('/file/upload', require('./router/fileUpload'));

module.exports = app;
