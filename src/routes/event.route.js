import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const eventRouter = Router();

// ROTA PARA CADASTRAR NOVOS EVENTOS
eventRouter.post("/createEvent", createEvent);

// ROTA PARA LISTAR TODOS OS EVENTOS
eventRouter.get("/events", getAllEvents);

// ROTA PARA LISTAR EVENTOS POR ID
eventRouter.get("/eventById", getEventById);

// ROTA PARA ATUALIZAR ATUALIZAR EVENTO
eventRouter.get("/updateEvent", updateEvent);

// ROTA PARA DELETAR O EVENTO
eventRouter.delete("/deleteEvent", deleteEvent);

// EXPORTANDO PARA O INDEX ROUTER
export { eventRouter };
