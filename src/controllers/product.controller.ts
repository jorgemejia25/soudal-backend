import { Product } from "../models/Product";
import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import request from "request";
import { sequelize } from "../db/db";

const uploadDir = path.join(__dirname, "../../public/files");

const isFileValid = (file: any) => {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png", "pdf"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

export class ProductController {
  constructor() {
    sequelize.sync();
  }

  crear(req: express.Request, res: express.Response) {
    const form = formidable({
      multiples: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir,
    });

    let ruta: string;
    let imageBody: any;

    form.parse(req, async (err, fields, files) => {
      // try {
      let fileName: string | undefined = undefined;
      let finalUrl: string | undefined = undefined;

      if (files.img) {
        const file: any = files.img;

        const isValid: any = isFileValid(file);

        fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));
        finalUrl = `${process.env.URL}/image/${fileName}`;
        console.log(fileName);

        if (!isValid) {
          return res.status(400).json({
            message: "Error",
          });
        }

        fs.renameSync(file.path, path.join(uploadDir, fileName));
      }

      Product.sync();

      request(
        {
          url: "https://api.imgbb.com/1/upload",
          method: "POST",
          form: {
            key: "7fdacf80f6dae833d604004e1bf5a436",
            image:
              "https://as.com/meristation/imagenes/2021/07/26/noticias/1627303243_213719_1627303346_noticia_normal_recorte1.jpg",
          },
        },
        function (error, response, body) {
          ruta = JSON.parse(body).data.url;
        }
      );

      const lastProductCreated = await Product.create({
        nombre: fields.nombre as string,
        categoria: (fields.categoria as string).toLowerCase(),
        descripcion: fields.descripcion as string,
        caracteristicas: fields.caracteristicas as string,
        aplicaciones: fields.aplicaciones as string,
        imagen: ruta,
      });

      return res.status(201).json({
        message: "Success",
        finalUrl,
        imageBody,
      });
      // } catch {
      //   return res.status(400).json({
      //     message: "Error",
      //   });
      // }
    });

    return;
  }

  async ver(req: express.Request, res: express.Response) {
    const productos = await Product.findAll();

    return res.json(productos);
  }

  async verCategoria(req: express.Request, res: express.Response) {
    const productos = await Product.findAll({
      where: { categoria: req.params.categoria.toLowerCase() },
    });

    return res.json(productos);
  }

  test(req: express.Request, res: express.Response) {
    // request.post({url:  "https://api.imgbb.com/1/upload", form: {
    //   key: "7fdacf80f6dae833d604004e1bf5a436",
    //   image:
    //     "https://as.com/meristation/imagenes/2021/07/26/noticias/1627303243_213719_1627303346_noticia_normal_recorte1.jpg",
    // } ,
    //   function (error, response, body) {
    //     console.log(body);
    //   }
    // );
  }
}
