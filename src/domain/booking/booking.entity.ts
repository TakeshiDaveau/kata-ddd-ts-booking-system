import {AggregateRoot} from '@lib/domain/aggregate-root';
import {AggregateId} from '@lib/types/aggregate-id';
import {v4} from 'uuid';
import {BookingSubmittedEvent} from './booking-submitted.event';

export interface BookingProps {
  roomName: string;
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

    booking.addEvent(
      new BookingSubmittedEvent({
        aggregateId: id,
        ...props,
      })
    );
    return booking;
  }
}
