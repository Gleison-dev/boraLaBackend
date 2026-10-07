import { EventService } from "../services/Event.service.js";

const instanceEventService = new EventService();

// CADASTRAR EVENTO
const createEvent = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, date, time, location, address, price, status } =
      req.body;
    const newEvent = await instanceEventService.createEventService(
      userId,
      title,
      description,
      date,
      time,
      location,
      address,
      price,
      status,
    );
    return res.status(201).json({ newEvent });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// LISTAR TODOS OS EVENTOS CADASTRADOS
const getAllEvents = async (req, res) => {
  try {
    const events = await instanceEventService.getAllEventsService();
    return res.status(201).json({ events });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// LISTAR EVENTO PELO ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.query;
    const event = await instanceEventService.getEventByIdService(id);
    return res.status(201).json({ event });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// ATUALIZAR EVENTO
const updateEvent = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.query;
    const { ...data } = req.body;
    const event = await instanceEventService.updateEventService(userId, id, data);
    return res.status(201).json({ event });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// EXCLUIR EVENTO
const deleteEvent = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.query;
    const event = await instanceEventService.deleteEventService(id);
    return res.status(201).json({ event });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// EXPORTANDO OS CONTROLADORES PARA AS ROTAS
export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
