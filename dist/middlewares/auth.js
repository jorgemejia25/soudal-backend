"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutasProtegidas = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.rutasProtegidas = express_1.default.Router();
exports.rutasProtegidas.use(function (req, res, next) {
    var token = req.headers["access-token"];
    if (token) {
        jsonwebtoken_1.default.verify(token, "E4AA5F84513213848B426338BA849", function (err, decoded) {
            if (err) {
                return res.json({ mensaje: "Token inválida" });
            }
            else {
                next();
            }
        });
    }
    else {
        res.send({
            mensaje: "Token no proveída.",
        });
    }
});
