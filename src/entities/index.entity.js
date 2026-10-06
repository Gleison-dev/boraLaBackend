import { UserEntity } from "../entities/user.entity.js";
import { EventEntity } from "./event.entity.js";

// UM USUÁRIO PODE TER MUITOS EVENTOS
UserEntity.hasMany(EventEntity, {
  foreignKey: "userId",
  as: "eventos",
  onDelete: "CASCADE",
});

EventEntity.belongsTo(UserEntity, {
  foreignKey: "userId",
  as: "usuario",
});

export { UserEntity, EventEntity };
