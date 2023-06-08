import {Command, CommandProps} from '@lib/domain/command';
import {PaymentProps} from './payment.entity';

type RequestPaymentCommandProps = CommandProps<PaymentProps>;

export class RequestPaymentCommand extends Command<
  CommandProps<RequestPaymentCommandProps>
> {
  static readonly type = 'RequestPaymentCommand';
  constructor(payment: RequestPaymentCommandProps) {
    super('RequestPaymentCommand', payment);
  }
}
