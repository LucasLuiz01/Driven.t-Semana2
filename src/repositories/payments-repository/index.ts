import { prisma } from "@/config";
import { Payment } from "@prisma/client";
type objectInsert = {
    ticketId: number,
    value: number,
    cardIssuer: string,
    cardLastDigits: string
}
async function getPaymentsRepository(ticketId: number) {
    const payment = await prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            TicketType: true,
            Enrollment: true
        }
    });
    return payment;
}
async function insertPayment(object: objectInsert){
    const payments = await prisma.payment.create({
        data: {
            cardIssuer: object.cardIssuer,
            value: object.value,
            cardLastDigits: object.cardLastDigits,
            ticketId: object.ticketId
        }
    })
    return payments
}
async function getPayments(ticketId: number) {
    const payments = await prisma.payment.findFirst({
        where: {
            ticketId
        }
    });
    return payments;
}
async function paid (ticketId: number) {
    await prisma.ticket.update({
        where:{
            id: ticketId
        },
        data:{
            status: "PAID"
        }
    })
   
}

const payments = {
    getPaymentsRepository,
    getPayments, 
    insertPayment,
    paid
    
}
export default payments;