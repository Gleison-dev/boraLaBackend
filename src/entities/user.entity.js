import { Sequelize, DataTypes } from "sequelize";
import { sequelize as database } from "../database/connection.js";

const UserEntity = database.define("tb_user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("PARTICIPANT", "ORGANIZER", "ADMIN"),
    allowNull: false,
  },
});

export { UserEntity };
