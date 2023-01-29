import { prisma } from "@/config";
import { TicketType, Enrollment, Ticket } from "@prisma/client";

async function getTypesTicketRepository(): Promise<TicketType[]> {
    const ticket = await prisma.ticketType.findMany();
    return ticket;
}
async function userRegistrationExist(userId:number) {
    const ticket = await prisma.enrollment.findFirst({
        where:{
            userId
        }
    });
    return ticket;
}

async function postTicket (id: number, ticketTypeId:number){
    const insert = await prisma.ticket.create({
        data: {
            enrollmentId: id,
            ticketTypeId,
            status:'RESERVED'
        },
        include:{
            TicketType: true
        }
    })
return insert
}


async function getTicketRepository(userId: number) {
    const ticket = await prisma.enrollment.findFirst({
        where: {
            userId
        },
        select: {
            id: true
        }

    })
    return ticket
}
async function getTicketRepositoryTwo(id: number) {
    const tickets = await prisma.ticket.findFirst({
        where: {
            enrollmentId: id
        },
        include: {
            TicketType: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }

    })
    return tickets;
}

const ticket = {
    getTypesTicketRepository,
    getTicketRepository,
    getTicketRepositoryTwo,
    userRegistrationExist,
    postTicket
}
export default ticket;