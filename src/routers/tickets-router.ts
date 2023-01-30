import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypesTicket, getTicket, postTicket } from "@/controllers";

const ticktesRouter = Router();
ticktesRouter.get("/types", authenticateToken, getTypesTicket);
ticktesRouter.get("/", authenticateToken, getTicket);
ticktesRouter.post("/", authenticateToken, postTicket);

export { ticktesRouter };
