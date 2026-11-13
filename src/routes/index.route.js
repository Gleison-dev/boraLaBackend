import { Router } from "express";
import { userRouter } from "./user.route.js";
import { eventRouter } from "./event.route.js";
import { systemRouter } from "./system.route.js";

const router = Router();

router.use(userRouter);
router.use(eventRouter);
router.use(systemRouter);

export { router };
