import {DomainEvent, DomainEventProps} from '@lib/domain/domain-event';
import {BookingProps} from './booking.entity';

export class BookingSubmittedEvent extends DomainEvent {
  constructor(props: DomainEventProps<BookingProps>) {
    super(props);
    console.log(
      `BookingSubmittedEvent created with value ${JSON.stringify(this)}`
    );
  }
}
