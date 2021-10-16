import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/index";
import { sequelize } from "./db/db";

// Dotenv

dotenv.config();

// Express Server

const app: express.Application = express();
const port = process.env.PORT;

// CORS

app.use(
  cors({
    origin: "*",
  })
);

// Body-parser

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Router

app.use(router);

// Listening

app.listen(process.env.PORT, async () => {
  console.log(`Server listening on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
