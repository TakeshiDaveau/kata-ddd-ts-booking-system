import { Module } from '@nestjs/common';
import { RequestPaymentHandler } from './request/request-payment.handler';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [RequestPaymentHandler];

@Module({
  imports: [ CqrsModule ],
  providers: [...commandHandlers],
})
export class PaymentModule {}
