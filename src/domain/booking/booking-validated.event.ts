import {DomainEvent, DomainEventProps} from '@lib/domain/domain-event';
import {BookingProps} from './booking.entity';

export class BookingValidatedEvent extends DomainEvent {
  constructor(props: DomainEventProps<BookingProps>) {
    super(props);
    // console.log(
    //   `BookingValidatedEvent created with value ${JSON.stringify(this)}`
    // );
  }
}
