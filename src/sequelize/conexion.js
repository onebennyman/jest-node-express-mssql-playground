const { Sequelize } = require('sequelize');

const dialect = process.env.DB_TYPE;
const host = process.env.DB_URL;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, pass, {
  host,
  dialect,
  logging: false,
});

// Verifica la conexión
module.exports = sequelize;
