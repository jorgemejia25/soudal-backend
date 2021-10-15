import express from "express";
import jwt from "jsonwebtoken";

export const authController = (req: express.Request, res: express.Response) => {
  if (req.body.usuario === "inge" && req.body.password === "Jm921%++") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, "E4AA5F84513213848B426338BA849", {
      expiresIn: 1440,
    });
    res.json({
      mensaje: "Autenticación correcta",
      token: token,
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
};
