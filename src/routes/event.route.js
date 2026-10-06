import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const eventRouter = Router();

// ROTA PARA CADASTRAR NOVOS EVENTOS
eventRouter.post("/createEvent", authMiddleware, createEvent);

// ROTA PARA LISTAR TODOS OS EVENTOS
eventRouter.get("/events", authMiddleware, getAllEvents);

// ROTA PARA LISTAR EVENTOS POR ID
eventRouter.get("/eventById", authMiddleware, getEventById);

// ROTA PARA ATUALIZAR ATUALIZAR EVENTO
eventRouter.get("/updateEvent", authMiddleware, updateEvent);

// ROTA PARA DELETAR O EVENTO
eventRouter.delete("/deleteEvent", authMiddleware, deleteEvent);

// EXPORTANDO PARA O INDEX ROUTER
export { eventRouter };
