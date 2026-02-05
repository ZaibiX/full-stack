// import dotenv from "dotenv";
// dotenv.config();
import "./config/loadEnv.js";
import express from "express";
import db from "./config/database/db.js";

import cors from "cors";
// import multer from "multer";
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dashboardDataRouter from "./routes/dashboardDataRoutes.js";
// const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.109:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); //body-parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static('static'));

db();

app.use("/api", productRouter);
app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", dashboardDataRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.post("/api/product", upload.single("file") ,(req, res) => {
//   console.log(req.file);
//   res.send("Create Product");
// });
