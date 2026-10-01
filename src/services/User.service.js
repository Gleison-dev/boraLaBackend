import { UserEntity } from "../entities/user.entity.js";
import { ERRORS, SUCESS } from "../shared/messages.shared.js";

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
    const createUser = await UserEntity.create({
      name,
      last_name,
      email,
      password,
      role,
    });
    return `Usuário ${SUCESS.CREATE}`;
  }

  async getAllUsersService() {
    const allUsers = await UserEntity.findAll();
    return allUsers;
  }
}
