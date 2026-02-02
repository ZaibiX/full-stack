import express from "express";
import { readAllUsers, updateUser, deleteUser, createUser } from "../controllers/users.controllers.js";
import protectRoutes from "../middleware/protectRoutes.js";
import allowedRoles from "../middleware/allowedRoles.js";

const userRouter = express.Router();

// 1. Read all users (Admin only)
userRouter.get("/users", protectRoutes, allowedRoles(["Admin", "Store-manager"]),readAllUsers);

// 2. Update/Edit a user (Admin only)
userRouter.put("/user/:id", protectRoutes, allowedRoles(["Admin"]), updateUser);

// 3. Delete a user (Admin only)
userRouter.delete("/user/:id", protectRoutes, allowedRoles(["Admin"]), deleteUser);
// 4 creating or sign up 
userRouter.post("/user", protectRoutes, allowedRoles(["Admin"]), createUser);
export default userRouter;

