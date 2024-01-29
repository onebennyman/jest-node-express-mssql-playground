require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const jsonContentTypeMiddleware = require('./middleware/jsonContentType');

const app = express();

app.use(express.json());
app.use(fileUpload());

// Agrega el middleware
app.use(jsonContentTypeMiddleware);
// Rutas web
app.use('/file/upload', require('./router/fileUpload'));

module.exports = app;
