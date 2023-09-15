import { Command, CommandProps } from '@lib/domain/command';
import { CreatePayment } from '../payment.type';

type RequestPaymentCommandProps = CommandProps<CreatePayment>;

export class RequestPaymentCommand extends Command<
  CommandProps<RequestPaymentCommandProps>
> {
  constructor(props: RequestPaymentCommandProps) {
    super(props);
  }
}
