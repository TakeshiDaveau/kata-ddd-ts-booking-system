import {DomainEvent, DomainEventProps} from '@lib/domain/domain-event';
import {PaymentProps} from './payment.entity';

export class PaymentRequestedEvent extends DomainEvent {
  constructor(props: DomainEventProps<PaymentProps>) {
    super(props);
    // console.log(
    //   `PaymentRequestedEvent created with value ${JSON.stringify(this)}`
    // );
  }
}
