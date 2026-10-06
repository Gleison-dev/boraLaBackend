import { ERRORS, SUCESS } from "../shared/messages.shared.js";
import { UserEntity } from "../entities/user.entity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  // CADASTRAR USUÁRIO
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

  async loginService(email, password) {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = new Error(`${ERRORS.PASSWORD_INCORRECT}`);
      error.status = 409;
      throw error;
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return { token: token };
  }

  // LISTAR TODOS OS USUÁRIOS
  async getAllUsersService() {
    const allUsers = await UserEntity.findAll();
    return allUsers;
  }

  // LISTAR USUÁRIO PELO ID
  async getUserByIdService(id) {
    const user = await UserEntity.findByPk(id);
    if (!user) {
      const error = new Error(`Usuário ${ERRORS.NOT_FOUND}`);
      error.status = 404;
      throw error;
    }
    return user;
  }

  // ATUALIZAR O USUÁRIO (NOME, EMAIL, PASSWORD, ETC)
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

  // DELETAR USUÁRIO (PRECISA DO ID E DA SENHA)
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
