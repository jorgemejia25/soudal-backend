"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verImagen = void 0;
var path_1 = __importDefault(require("path"));
var imageDir = path_1.default.join(__dirname, "../../public/files");
var verImagen = function (req, res) {
    console.log(__dirname);
    res.sendFile(imageDir + "/" + req.params.img);
};
exports.verImagen = verImagen;
