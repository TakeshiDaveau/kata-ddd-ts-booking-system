import {CommandHandler} from '@tshio/command-bus';
import {RequestPaymentCommand} from './request-payment.command';
import {PaymentEntity} from './payment.entity';

export class RequestPaymentHandler
  implements CommandHandler<RequestPaymentCommand>
{
  public commandType = RequestPaymentCommand.type;

  async execute(command: RequestPaymentCommand): Promise<string> {
    const booking = PaymentEntity.create(command.payload);
    booking.publishEvents();
    return booking.id;
  }
}
