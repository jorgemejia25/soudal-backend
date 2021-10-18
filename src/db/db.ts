import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let options = {};

if (!process.env.PRODUCTION) {
  options = {
    host: process.env.DB_HOST!,
    dialect: "postgres",

    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  options = {
    host: process.env.DB_HOST!,
    dialect: "postgres",
  };
}

export const sequelize = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  options
);
