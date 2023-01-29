import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypesTicket, getTicket } from "@/controllers";

const ticktesRouter = Router();
ticktesRouter.get("/types", authenticateToken,getTypesTicket)
ticktesRouter.get("/", authenticateToken, getTicket)


export {ticktesRouter};