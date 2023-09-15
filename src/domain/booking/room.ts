import { ValueObject } from '@lib/domain/value-object';
import { ArgumentInvalidException } from '@lib/exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from '@lib/exceptions/argument-not-provided.exception';
import { isEmpty } from '@lib/guard/is-empty';

export type RoomName = string;

export const isRoomName = (value: unknown): value is RoomName => {
  return typeof value === 'string' && value.length > 0 && value.length <= 50;
};

export interface RoomProps {
  roomName: RoomName;
}

export class Room extends ValueObject<RoomProps> {
  get roomName(): RoomName {
    return this.props.roomName;
  }
  protected validate(props: RoomProps): void {
    if (isEmpty(props.roomName)) {
      throw new ArgumentNotProvidedException('roomName is missing');
    }
    if (!isRoomName(props.roomName)) {
      throw new ArgumentInvalidException('roomName is not a type RoomName');
    }
  }
}
