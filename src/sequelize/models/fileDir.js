// Define tu modelo aquí
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const FileDir = sequelize.define(
  'FileDir',
  {
    md5: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

module.exports = FileDir;
