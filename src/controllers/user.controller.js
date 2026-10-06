import { UserService } from "../services/User.service.js";

const instanceUserService = new UserService();

const createUser = async (req, res) => {
  try {
    const { name, last_name, email, password, role } = req.body;
    const user = await instanceUserService.createUserService(
      name,
      last_name,
      email,
      password,
      role,
    );
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await instanceUserService.loginService(email, password);
    return res.status(201).json({ login });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await instanceUserService.getAllUsersService();
    return res.status(201).json({ users });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await instanceUserService.getUserByIdService(id);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { ...data } = req.body;
    const user = await instanceUserService.updateUserService(id, data);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { password } = req.body;
    const user = await instanceUserService.deleteUserService(id, password);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export { createUser, login, getAllUsers, getUserById, updateUser, deleteUser };
