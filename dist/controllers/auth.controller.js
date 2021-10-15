"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authController = function (req, res) {
    if (req.body.usuario === "inge" && req.body.password === "Jm921%++") {
        var payload = {
            check: true,
        };
        var token = jsonwebtoken_1.default.sign(payload, "E4AA5F84513213848B426338BA849", {
            expiresIn: 1440,
        });
        res.json({
            mensaje: "Autenticación correcta",
            token: token,
        });
    }
    else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
};
exports.authController = authController;
