import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import tickteService from "@/services/tickte-service";

export async function postTicket (req: AuthenticatedRequest, res: Response){
  const idUser = req.userId;
  const userId = Number(idUser);
  const {ticketTypeId} = req.body;


  try{
    const event = await tickteService.postTickets(userId, Number(ticketTypeId))
    res.status(httpStatus.CREATED).send(event);
  }catch(err){
    console.log(err)
    if(err.name === "NotFoundError"){
      return res.sendStatus(httpStatus.NOT_FOUND)
     }
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export async function getTypesTicket( req: AuthenticatedRequest, res: Response) {
    try {
      const event = await tickteService.getTypesTickets()
       res.status(httpStatus.OK).send(event);
    } catch (error) {
      console.log(error);
       res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
  export async function getTicket( req: AuthenticatedRequest, res: Response) {
    const idUser = req.userId
    const userId = Number(idUser)
    try {
      const event = await tickteService.getTickets(userId)
       res.status(200).send(event);
    } catch (error) {
      if(error.name === "NotFoundError"){
       return res.sendStatus(httpStatus.NOT_FOUND)
      }
      console.log(error);
       res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
  
  

