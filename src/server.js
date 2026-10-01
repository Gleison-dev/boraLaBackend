import { testConnection } from "../src/database/connection.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.SVPORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  testConnection();
  console.log("Servidor rodando!");
});
