"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var db_1 = require("../db/db");
var _a = require("sequelize"), Sequelize = _a.Sequelize, DataTypes = _a.DataTypes;
exports.Product = db_1.sequelize.define("Producto", {
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
}, {
// Other model options go here
});
