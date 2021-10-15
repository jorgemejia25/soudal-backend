import express from "express";
import path from "path";

const imageDir = path.join(__dirname, "../../public/files");

export const verImagen = (req: express.Request, res: express.Response) => {
  console.log(__dirname);
  res.sendFile(`${imageDir}/${req.params.img}`);
};
