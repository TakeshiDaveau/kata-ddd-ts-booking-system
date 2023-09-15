import { RequestPaymentCommand } from './request-payment.command';
import { PaymentEntity } from '../payment.entity';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { save } from '@infrastructure/db/payment.db';

@CommandHandler(RequestPaymentCommand)
export class RequestPaymentHandler
  implements ICommandHandler<RequestPaymentCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: RequestPaymentCommand): Promise<string> {
    const payment = this.publisher.mergeObjectContext<PaymentEntity>(PaymentEntity.create(command.payload));

    save(payment);

    payment.submitPaymentRequest();
    payment.commit();
    return payment.id;
  }
}
