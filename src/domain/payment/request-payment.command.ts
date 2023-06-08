import {Command, CommandProps} from '@lib/domain/command';
import {CreatePayment} from './payment.type';

type RequestPaymentCommandProps = CommandProps<CreatePayment>;

export class RequestPaymentCommand extends Command<
  CommandProps<RequestPaymentCommandProps>
> {
  static readonly type = 'RequestPaymentCommand';
  constructor(props: RequestPaymentCommandProps) {
    super('RequestPaymentCommand', props);
  }
}
