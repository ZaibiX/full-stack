import express from "express";
import { login, logout, checkAuth } from "../controllers/auth.controllers.js";
import alreadyLoggedIn from "../middleware/alreadyLoggedIn.js";
import protectRoutes from "../middleware/protectRoutes.js";

const authRouter = express.Router();

authRouter.post("/login", alreadyLoggedIn, login);
// authRouter.post("/sign-up", alreadyLoggedIn, signUp);
authRouter.delete("/logout", protectRoutes, logout);
authRouter.get("/check-auth", protectRoutes, checkAuth);

export default authRouter;
