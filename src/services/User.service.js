import { UserEntity } from "../entities/user.entity.js";
import { ERRORS, SUCESS } from "../shared/messages.shared.js";
import bcrypt from "bcrypt";

class UserService {
  async createUserService(name, last_name, email, password, role) {
    const verifyUserExists = await UserEntity.findOne({
      where: {
        email,
      },
    });
    if (verifyUserExists) {
      const error = new Error(`Usuário ${ERRORS.ALREADY_EXISTS}`);
      error.status = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await UserEntity.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });
    return `Usuário ${SUCESS.CREATE}`;
  }

  async getAllUsersService() {
    const allUsers = await UserEntity.findAll();
    return allUsers;
  }

  async getUserByIdService(id) {
    const user = await UserEntity.findByPk(id);
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    return user;
  }

  async updateUserService(id, data) {
    const user = await UserEntity.findByPk(id);
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    await user.update(data);
    return `Usuário ${SUCESS.UPDATE}`;
  }

  async deleteUserService(id, password) {
    const user = await UserEntity.findByPk(id);
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = new Error(`${ERRORS.PASSWORD_INCORRECT}`);
      error.status = 401;
      throw error;
    }
    const deleteUser = await UserEntity.destroy({
      id,
    });
    return `Usuário ${SUCESS.DELETE}`;
  }
}

export { UserService };
