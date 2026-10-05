import { EventEntity } from "../entities/event.entity.js";
import { ERRORS, SUCESS } from "../shared/messages.shared.js";

class EventService {
  async createEventService(
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
      title,
      date,
    });
    if (verifyEventExists) {
      const error = new Error(`Evento ${ERRORS.ALREADY_EXISTS}`);
      error.status = 409;
      throw error;
    }
    const newEvent = await EventEntity.create({
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

  async getAllEventsService() {
    const events = await EventEntity.findAll();
    return events;
  }

  async getEventByIdService(id) {
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    return event;
  }

  async updateEventService(id, data) {
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    await event.update(data);
    return `Evento ${SUCESS.UPDATE}`;
  }

  async deleteEventService(id) {
    const event = await EventEntity.findByPk(id);
    if (!event) {
      const error = new Error(`Evento ${ERRORS.NOT_FOUND}`);
      error.status = 404;
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
