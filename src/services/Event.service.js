import { ERRORS, SUCESS } from "../shared/messages.shared.js";
import { EventEntity } from "../entities/event.entity.js";
import { UserEntity } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

class EventService {
  // CADASTRAR EVENTO
  async createEventService(
    userId,
    title,
    description,
    date,
    time,
    location,
    address,
    price,
    status,
  ) {
    const verifyEventExists = await EventEntity.findOne({
      userId,
      title,
      date,
    });
    if (verifyEventExists) {
      const error = new Error(`Evento ${ERRORS.ALREADY_EXISTS}`);
      error.status = 409;
      throw error;
    }
    const newEvent = await EventEntity.create({
      userId,
      title,
      description,
      date,
      time,
      location,
      address,
      price,
      status,
    });
    return `Evento ${SUCESS.CREATE}`;
  }

  // LISTAR TODOS OS EVENTOS CADASTRADOS
  async getAllEventsService() {
    const events = await EventEntity.findAll();
    return events;
  }

  // LISTAR EVENTO PELO ID
  async getEventByIdService(id) {
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    return event;
  }

  // ATUALIZAR EVENTO (NOME, DESCRIÇÃO, DATA, HORA, ETC)
  async updateEventService(userId, id, data) {
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    if (userId !== event.userId) {
      const error = new Error("Você não pode atualizar este evento!");
      error.status = 409;
      throw error;
    }
    await event.update(data);
    return `Evento ${SUCESS.UPDATE}`;
  }

  // DELETAR EVENTO PELO ID (VAI PRECISAR DA SENHA FUTURAMENTE)
  async deleteEventService(userId, id, password) {
    const user = await UserEntity.findByPk(userId);
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    if (userId !== event.userId) {
      const error = new Error("Você não pode atualizar este evento!");
      error.status = 409;
      throw error;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = new Error(`${ERRORS.PASSWORD_INCORRECT}`);
      error.status = 409;
      throw error;
    }
    const deleteEvent = await EventEntity.destroy({
      where: {
        id,
      },
    });
    return `Evento ${SUCESS.DELETE}`;
  }
}

export { EventService };
