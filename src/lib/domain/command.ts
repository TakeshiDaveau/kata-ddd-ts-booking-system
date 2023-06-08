import {isEmpty} from '@lib/guard/is-empty';
import {ArgumentNotProvidedException} from '@lib/exceptions/argument-not-provided.exception';
import {Command as AbstractCommand} from '@tshio/command-bus';

export type CommandProps<T> = T;

export class Command<T> implements AbstractCommand<T> {
  readonly type: string;
  readonly payload: T;

  constructor(type: string, props: T) {
    if (isEmpty(type)) {
      throw new ArgumentNotProvidedException(
        'Command type should not be empty'
      );
    }
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty'
      );
    }
    this.type = type;
    this.payload = props;
  }
}
