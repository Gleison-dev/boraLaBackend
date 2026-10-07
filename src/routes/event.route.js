import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { Router } from "express";
import organizerMiddleware from "../middlewares/organizer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const eventRouter = Router();

// ROTA PARA CADASTRAR NOVOS EVENTOS
eventRouter.post(
  "/createEvent",
  authMiddleware,
  organizerMiddleware,
  createEvent,
);

// ROTA PARA LISTAR TODOS OS EVENTOS
eventRouter.get("/events", authMiddleware, getAllEvents);

// ROTA PARA LISTAR EVENTOS POR ID
eventRouter.get("/eventById", authMiddleware, getEventById);

// ROTA PARA ATUALIZAR ATUALIZAR EVENTO
eventRouter.put(
  "/editEvent",
  authMiddleware,
  organizerMiddleware,
  updateEvent,
);

// ROTA PARA DELETAR O EVENTO
eventRouter.delete(
  "/deleteEvent",
  authMiddleware,
  organizerMiddleware,
  deleteEvent,
);

// EXPORTANDO PARA O INDEX ROUTER
export { eventRouter };
