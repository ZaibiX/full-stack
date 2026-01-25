import express from "express";
import { login, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/sign-up", signUp);

export default authRouter;
