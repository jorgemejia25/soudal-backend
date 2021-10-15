import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/index";
import { sequelize } from "./db/db";

// Dotenv

dotenv.config();

// Express Server

const app: express.Application = express();
const port = process.env.PORT || 3000;

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

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
