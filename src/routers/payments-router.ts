import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers/payments-controller";

const paymentsRouter = Router();
paymentsRouter.get("/", authenticateToken, getPayments);
paymentsRouter.post("/process", authenticateToken, postPayments);

export { paymentsRouter };
