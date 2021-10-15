import express, { Router } from "express";

import { ProductController } from "../controllers/product.controller";
import { authController } from "../controllers/auth.controller";
import { rutasProtegidas } from "../middlewares/auth";
import { verImagen } from "../controllers/image.controller";

export const router = Router();

const productController = new ProductController();

router.post("/create", rutasProtegidas, productController.crear);
router.get("/view", productController.ver);
router.get("/categoria/:categoria", productController.verCategoria);
router.get("/image/:img", verImagen);

router.post("/auth", authController);
