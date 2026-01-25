// import dotenv from "dotenv";
// dotenv.config();
import "./config/loadEnv.js";
import express from "express";
import db from "./database/db.js";

import cors from "cors";
// import multer from "multer";
import router from "./routes/routes.js";
import authRouter from "./routes/authRoutes.js";

// const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(express.json()); //body-parser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('static'));

db();

app.use("/api", router);
app.use("/api", authRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.post("/api/product", upload.single("file") ,(req, res) => {
//   console.log(req.file);
//   res.send("Create Product");
// });
