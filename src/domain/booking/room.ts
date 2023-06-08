import {ValueObject} from '@lib/domain/object-value';
import {ArgumentNotProvidedException} from '@lib/exceptions/argument-not-provided.exception';
import {isEmpty} from '@lib/guard/is-empty';

export interface RoomProps {
  roomName: string;
}

export class Room extends ValueObject<RoomProps> {
  get roomName(): string {
    return this.props.roomName;
  }
  protected validate(props: RoomProps): void {
    if (isEmpty(props.roomName)) {
      throw new ArgumentNotProvidedException('roomName is missing');
    }
  }
}
