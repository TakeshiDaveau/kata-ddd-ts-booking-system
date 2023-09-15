import { Module } from '@nestjs/common';
import { RequestPaymentHandler } from './request/request-payment.handler';

const commandHandlers = [RequestPaymentHandler];

@Module({
  providers: [...commandHandlers],
})
export class PaymentModule {}
