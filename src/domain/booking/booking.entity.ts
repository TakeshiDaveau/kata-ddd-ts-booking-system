import {AggregateRoot} from '@lib/domain/aggregate-root';
import {AggregateId} from '@lib/types/aggregate-id';
import {v4} from 'uuid';
import {BookingSubmittedEvent} from './booking-submitted.event';
import {Room} from './room';
import {BookingValidatedEvent} from './booking-validated.event';

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

  static validateBooking(booking: BookingProps) {
    const foundBookingEntity = new BookingEntity({
      id: v4(),
      props: {...booking, status: 'valid'},
    });

    foundBookingEntity.addEvent(
      new BookingValidatedEvent({
        aggregateId: foundBookingEntity._id,
        ...foundBookingEntity.props,
      })
    );

    return foundBookingEntity;
  }

  static create(createProps: BookingProps): BookingEntity {
    const id = v4();
    const props: BookingProps = {...createProps};
    const booking = new BookingEntity({id, props});

    // Save to database

    booking.addEvent(
      new BookingSubmittedEvent({
        aggregateId: id,
        ...props,
      })
    );
    return booking;
  }
}
