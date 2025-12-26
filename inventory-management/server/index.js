import express from "express";
import db from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// app.use(express.static('static'));

db();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
