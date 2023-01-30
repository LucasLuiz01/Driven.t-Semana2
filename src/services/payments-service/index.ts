import payments from "@/repositories/payments-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import { paymentPost } from "@/protocols";
async function getPaymentsService(userId: number, ticketId: number) {
  const payment = await payments.getPaymentsRepository(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  if (payment.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const paymentget: Payment = await payments.getPayments(ticketId);
  return paymentget;
}
async function postPaymentsService(userId: number, body: paymentPost) {
  const payment = await payments.getPaymentsRepository(body.ticketId);
  if (!payment) {
    throw notFoundError();
  }
  if (payment.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const object = {
    ticketId: body.ticketId,
    value: payment.TicketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: body.cardData.number.toString().slice(-4)
  };
  const insert = await payments.insertPayment(object);
  await payments.paid(body.ticketId);
  return insert;
}
const paymentsService = {
  getPaymentsService,
  postPaymentsService
};

export default paymentsService;
