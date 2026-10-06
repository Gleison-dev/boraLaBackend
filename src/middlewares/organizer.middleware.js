import { ERRORS } from "../shared/messages.shared.js";

export default function organizerMiddleware(req, res, next) {
  if (req.userRole !== "ORGANIZER") {
    return res.status(401).json(ERRORS.ONLY_ORGANIZER);
  }
  next();
}
