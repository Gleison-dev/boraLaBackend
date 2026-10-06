import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.get("/userById", authMiddleware, getUserById);
userRouter.put("/editUser", authMiddleware, updateUser);
userRouter.post("/deleteUser", authMiddleware, deleteUser);

export { userRouter };
