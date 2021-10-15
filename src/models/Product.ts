import { sequelize } from "../db/db";

const { Sequelize, DataTypes } = require("sequelize");

export const Product = sequelize.define(
  "Producto",
  {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
