import { isEmpty } from '@lib/guard/is-empty';
import { ArgumentNotProvidedException } from '@lib/exceptions/argument-not-provided.exception';

export type CommandProps<T> = T;

export class Command<T> {
  readonly payload: T;

  constructor(props: T) {
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty',
      );
    }
    this.payload = props;
  }
}
