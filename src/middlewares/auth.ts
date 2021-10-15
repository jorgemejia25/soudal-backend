import express from "express";
import jwt from "jsonwebtoken";

export const rutasProtegidas = express.Router();
rutasProtegidas.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token: any = req.headers["access-token"];

    if (token) {
      jwt.verify(
        token,
        "E4AA5F84513213848B426338BA849",
        (err: any, decoded: any) => {
          if (err) {
            return res.json({ mensaje: "Token inválida" });
          } else {
            next();
          }
        }
      );
    } else {
      res.send({
        mensaje: "Token no proveída.",
      });
    }
  }
);
