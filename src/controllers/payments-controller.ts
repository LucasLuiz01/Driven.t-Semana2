import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";

export type paymentPost = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
	}
} 
export async function postPayments (req: AuthenticatedRequest, res: Response){
    const idUser = req.userId;
    const userId: number = Number(idUser);
    const body = req.body as paymentPost
    if(!body.cardData || !body.ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    try {
        const event = await paymentsService.postPaymentsService(userId, body)
         res.send(event)
      } catch (error) {
          if(error.name === "UnauthorizedError"){
              return  res.sendStatus(httpStatus.UNAUTHORIZED);
          }
          if(error.name === "NotFoundError"){
              return res.sendStatus(httpStatus.NOT_FOUND);
          }
        console.log(error);
         res.sendStatus(httpStatus.BAD_REQUEST);
      }
}

export async function getPayments( req: AuthenticatedRequest, res: Response) {
    const idUser = req.userId;
    const userId: number = Number(idUser);
    const idTicket = req.query.ticketId;
    const ticketId: number = Number(idTicket)
    if(!ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
      const event = await paymentsService.getPaymentsService(userId, ticketId)
       res.send(event)
    } catch (error) {
        if(error.name === "UnauthorizedError"){
            return  res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
      console.log(error);
       res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }