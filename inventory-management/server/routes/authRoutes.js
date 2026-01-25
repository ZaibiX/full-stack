import express from "express";
import { login, signUp } from "../controllers/auth.controllers.js";
import alreadyLoggedIn from "../middleware/alreadyLoggedIn.js";

const authRouter = express.Router();

authRouter.post("/login", alreadyLoggedIn, login);
authRouter.post("/sign-up", alreadyLoggedIn, signUp);

export default authRouter;
