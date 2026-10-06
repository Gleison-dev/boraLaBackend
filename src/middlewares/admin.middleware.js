import { ERRORS } from "../shared/messages.shared.js";

export default function adminMiddleware(req, res, next) {
  if (req.userRole !== "ADMIN") {
    return res.status(409).json(ERRORS.ONLY_ADMINS);
  }
  next();
}
