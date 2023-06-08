import {DomainEvent, DomainEventProps} from '@lib/domain/domain-event';
import {BookingProps} from './booking.entity';

export class BookingValidatedEvent extends DomainEvent {
  constructor(booking: DomainEventProps<BookingProps>) {
    super(booking);
    console.log(
      `BookingValidatedEvent created with value ${JSON.stringify(
        this,
        null,
        2
      )}`
    );
  }
}
