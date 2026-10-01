import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    ssl: {
      require: true,
    },
  },
);

const testConnection = async () => {
  try {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  } catch (error) {
    console.error(
      "Não foi possível realizar a conexão com o banco de dados",
      error,
    );
  }
};

export { sequelize, testConnection };
