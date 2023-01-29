import ticket from "@/repositories/tickets";
import { TicketType } from "@prisma/client";
import { notFoundError } from "@/errors";
async function getTypesTickets(): Promise<TicketType[]>{
const ticketsget = await ticket.getTypesTicketRepository()
return ticketsget
}
async function getTickets(userId: number){
  const ticketsget = await ticket.getTicketRepository(userId)
  if(!ticketsget.id)throw notFoundError()
  const id: number = ticketsget.id
  const ticketsgettwo = await ticket.getTicketRepositoryTwo(id)
  if(!ticketsgettwo) throw notFoundError()
  return ticketsgettwo;
}

const tickteService = {
    getTypesTickets,
    getTickets
  };
  
  export default tickteService;