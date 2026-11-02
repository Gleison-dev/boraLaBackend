import {
  createUser,
  loginUser,
  me,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

// CADASTRAR USUÁRIO
userRouter.post("/createUser", createUser);

// LOGIN
userRouter.post("/login", loginUser);

// LISTA NOME, SOBRENOME E EMAIL DO USUÁRIO PELO "userId"
userRouter.get("/me", authMiddleware, me);

//LISTAR TODOS OS USUÁRIOS
userRouter.get("/users", authMiddleware, getAllUsers);

// LISTAR USUARIO POR ID
userRouter.get("/userById", authMiddleware, getUserById);

// EDITAR USUÁRIO (Fazer a função de alterar a senha a parte)
userRouter.put("/editUser", authMiddleware, updateUser);

// DELETAR USUÁRIO
userRouter.delete("/deleteUser", authMiddleware, deleteUser);

export { userRouter };
