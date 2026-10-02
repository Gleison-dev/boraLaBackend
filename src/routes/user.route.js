import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/userById", getUserById);
userRouter.put("/createUser", updateUser);
userRouter.post("/deleteUser", deleteUser);

export { userRouter };
