import { Module } from '@nestjs/common';
import { RequestPaymentHandler } from './request/request-payment.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { PaymentRequestSagas } from './request/payment-request.saga';

const commandHandlers = [RequestPaymentHandler];

@Module({
  imports: [ CqrsModule ],
  providers: [...commandHandlers, PaymentRequestSagas],
})
export class PaymentModule {}
