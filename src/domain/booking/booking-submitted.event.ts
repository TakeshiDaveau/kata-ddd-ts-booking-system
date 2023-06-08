import {DomainEvent, DomainEventProps} from '@lib/domain/domain-event';
import {RoomProps} from './room';

export class BookingSubmittedEvent extends DomainEvent {
  readonly roomName: string;
  constructor(props: DomainEventProps<RoomProps>) {
    super(props);
    this.roomName = props.roomName;
    console.log(
      `BookingSubmittedEvent saved with value ${JSON.stringify(this)}`
    );
  }
}
