import { Router } from "express";
import { userRouter } from "./user.route.js";
import { eventRouter } from "./event.route.js";

const router = Router();

router.use(userRouter);
router.use(eventRouter);

export { router };
