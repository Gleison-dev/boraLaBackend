import { Router } from "express";
import { status } from "../controllers/system.controller.js";

const systemRouter = Router();

systemRouter.get("/status", status);

export { systemRouter };
