import { Sequelize, DataTypes } from "sequelize";
import { sequelize as database } from "../database/connection.js";

const EventEntity = database.define("tb_events", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("PUBLICADO", "CANCELADO", "FINALIZADO"),
    defaultValue: "PUBLICADO",
  },
});

export { EventEntity };
