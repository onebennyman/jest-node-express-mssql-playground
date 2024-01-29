// initialize.js
const sequelize = require('./conexion');
// eslint-disable-next-line no-unused-vars
const FileDir = require('./models/fileDir');

const initialize = async () => sequelize.sync();

const close = async () => sequelize.close();

const dropModelsData = async () => sequelize.drop();

module.exports = { initialize, close, dropModelsData };
