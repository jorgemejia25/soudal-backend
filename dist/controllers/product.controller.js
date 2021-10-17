"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var Product_1 = require("../models/Product");
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var request_1 = __importDefault(require("request"));
var db_1 = require("../db/db");
var uploadDir = path_1.default.join(__dirname, "../../public/files");
var isFileValid = function (file) {
    var type = file.type.split("/").pop();
    var validTypes = ["jpg", "jpeg", "png", "pdf"];
    if (validTypes.indexOf(type) === -1) {
        return false;
    }
    return true;
};
var ProductController = /** @class */ (function () {
    function ProductController() {
        db_1.sequelize.sync();
    }
    ProductController.prototype.crear = function (req, res) {
        var _this = this;
        var form = (0, formidable_1.default)({
            multiples: true,
            maxFileSize: 50 * 1024 * 1024,
            uploadDir: uploadDir,
        });
        var ruta;
        var imageBody;
        form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
            var fileName, finalUrl, file, isValid, lastProductCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = undefined;
                        finalUrl = undefined;
                        if (files.img) {
                            file = files.img;
                            isValid = isFileValid(file);
                            fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));
                            finalUrl = process.env.URL + "/image/" + fileName;
                            console.log(fileName);
                            if (!isValid) {
                                return [2 /*return*/, res.status(400).json({
                                        message: "Error",
                                    })];
                            }
                            fs_1.default.renameSync(file.path, path_1.default.join(uploadDir, fileName));
                        }
                        Product_1.Product.sync();
                        (0, request_1.default)({
                            url: "https://api.imgbb.com/1/upload",
                            method: "POST",
                            form: {
                                key: "7fdacf80f6dae833d604004e1bf5a436",
                                image: "https://as.com/meristation/imagenes/2021/07/26/noticias/1627303243_213719_1627303346_noticia_normal_recorte1.jpg",
                            },
                        }, function (error, response, body) {
                            ruta = JSON.parse(body).data.url;
                        });
                        return [4 /*yield*/, Product_1.Product.create({
                                nombre: fields.nombre,
                                categoria: fields.categoria.toLowerCase(),
                                descripcion: fields.descripcion,
                                caracteristicas: fields.caracteristicas,
                                aplicaciones: fields.aplicaciones,
                                imagen: ruta,
                            })];
                    case 1:
                        lastProductCreated = _a.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: "Success",
                                finalUrl: finalUrl,
                                imageBody: imageBody,
                            })];
                }
            });
        }); });
        return;
    };
    ProductController.prototype.ver = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findAll()];
                    case 1:
                        productos = _a.sent();
                        return [2 /*return*/, res.json(productos)];
                }
            });
        });
    };
    ProductController.prototype.verCategoria = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findAll({
                            where: { categoria: req.params.categoria.toLowerCase() },
                        })];
                    case 1:
                        productos = _a.sent();
                        return [2 /*return*/, res.json(productos)];
                }
            });
        });
    };
    ProductController.prototype.test = function (req, res) {
        // request.post({url:  "https://api.imgbb.com/1/upload", form: {
        //   key: "7fdacf80f6dae833d604004e1bf5a436",
        //   image:
        //     "https://as.com/meristation/imagenes/2021/07/26/noticias/1627303243_213719_1627303346_noticia_normal_recorte1.jpg",
        // } ,
        //   function (error, response, body) {
        //     console.log(body);
        //   }
        // );
    };
    return ProductController;
}());
exports.ProductController = ProductController;
