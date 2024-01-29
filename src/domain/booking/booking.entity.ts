import { AggregateRoot } from '@lib/domain/aggregate-root';
import { AggregateId } from '@lib/types/aggregate-id';
import { v4 } from 'uuid';
import { BookingSubmittedEvent } from './submit/booking-submitted.event';
import { Room } from './room';
import { BookingValidatedEvent } from './validate/booking-validated.event';
import { CreateBooking } from './booking.type';
import { DomainEvent } from '../../lib/domain/domain-event';
import { IEvent } from '@nestjs/cqrs';

export type BookingStatus =
  | 'booked'
  | 'pending'
  | 'valid'
  | 'checkin'
  | 'checkout'
  | 'closed';

export interface BookingProps {
  bookingId: string
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

  static createEmpty(id: AggregateId): BookingEntity {
    return new BookingEntity(BookingEntity.getStreamName(id), id);
  }

  static getStreamName(id: string): string {
    return `BookingEntity_${id}`
  }

  submitBooking(booking: BookingProps): void {
    this.applyChange<BookingSubmittedEvent>(
      new BookingSubmittedEvent({
        aggregateId: this.id,
        ...booking,
      })
    );
  }

  validateBooking(): void {
    this.props.status = 'valid';
    this.applyChange<BookingValidatedEvent>(
      new BookingValidatedEvent({
        aggregateId: this.id,
        ...this.props,
      })
    );
  }

  protected applyChange<T extends DomainEvent>(event: T, isFromHistory: boolean = false): void {
    const eventType = event.constructor.name;
    const payload: any = (event as any).payload as any ?? (event as any).props as any
    console.log(event, eventType, payload);
    
    if(!this.props) {
      this.props = {} as any;
    }
    switch (eventType) {
      case 'BookingSubmittedEvent':
        this.props.bookingId = payload.bookingId;
        this.props.room = payload.room;
        this.props.status = payload.status;
        this.props.arrivalDate = payload.arrivalDate;
        this.props.departureDate = payload.departureDate;
        this.props.firstName = payload.firstName;
        this.props.lastName = payload.lastName;
        break;
      case 'BookingValidatedEvent':
        this.props.bookingId = payload.bookingId
        this.props.status = payload.status
        break;
    }
    super.apply(event, {fromHistory: isFromHistory, skipHandler: false})
  }
}
