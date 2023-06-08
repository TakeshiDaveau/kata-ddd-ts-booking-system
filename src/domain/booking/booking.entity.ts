import {AggregateRoot} from '@lib/domain/aggregate-root';
import {AggregateId} from '@lib/types/aggregate-id';
import {v4} from 'uuid';
import {BookingSubmittedEvent} from './booking-submitted.event';
import {Room} from './room';
import {BookingValidatedEvent} from './booking-validated.event';
import {BookingsDB, updateById} from '@infrastructure/db/booking.db';

export type BookingStatus =
  | 'booked'
  | 'pending'
  | 'valid'
  | 'checkin'
  | 'checkout'
  | 'closed';

export interface BookingProps {
  status: BookingStatus;
  room: Room;
  arrivalDate: Date;
  departureDate: Date;
  firstName: string;
  lastName: string;
}

export class BookingEntity extends AggregateRoot<BookingProps> {
  // Ce _id est setté dans le constructeur d'une entity
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected readonly _id: AggregateId;

  public validate(): void {}

  static create(createProps: BookingProps): BookingEntity {
    const id = v4();
    const props: BookingProps = {...createProps};
    const booking = new BookingEntity({id, props});

    // Save to database
    BookingsDB.push(booking);

    // Save the event
    booking.addEvent(
      new BookingSubmittedEvent({
        aggregateId: id,
        ...props,
      })
    );
    return booking;
  }

  validateBooking(): BookingEntity {
    this.props.status = 'valid';

    updateById(this.id, this);

    this.addEvent(
      new BookingValidatedEvent({
        aggregateId: this.id,
        ...this.props,
      })
    );
    return this;
  }
}
