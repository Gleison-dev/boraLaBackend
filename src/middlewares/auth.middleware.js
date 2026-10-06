import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERRORS } from "../shared/messages.shared.js";

dotenv.config();

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).json(`${ERRORS.TOKEN_EXPIRED}`);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json();
  }
}
