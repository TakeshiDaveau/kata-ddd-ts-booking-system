import { AggregateRoot } from '@lib/domain/aggregate-root';
import { AggregateId } from '@lib/types/aggregate-id';
import { v4 } from 'uuid';
import { BookingSubmittedEvent } from './submit/booking-submitted.event';
import { Room } from './room';
import { BookingValidatedEvent } from './validate/booking-validated.event';
import { CreateBooking } from './booking.type';

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

  public validate(): void {
    return;
  }

  static create(createProps: CreateBooking): BookingEntity {
    const id = v4();
    const props: BookingProps = { ...createProps, status: 'booked' };
    return new BookingEntity(`booking_${id}`, { id, props });
  }

  submitBooking(): BookingEntity {
    this.apply(
      new BookingSubmittedEvent({
        aggregateId: this.id,
        ...this.props,
      })
    );
    return this;
  }

  validateBooking(): BookingEntity {
    this.props.status = 'valid';
    this.apply(
      new BookingValidatedEvent({
        aggregateId: this.id,
        ...this.props,
      })
    );

    return this;
  }
}
