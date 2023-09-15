import { ArgumentNotProvidedException } from '@lib/exceptions/argument-not-provided.exception';
import { isEmpty } from '@lib/guard/is-empty';
import { v4 } from 'uuid';

export type DomainEventProps<T> = Omit<T, 'id'> & {
  aggregateId: string;
};

export abstract class DomainEvent {
  public readonly eventId: string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  public readonly payload: DomainEventProps<unknown>;

  constructor(props: DomainEventProps<unknown>) {
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }
    this.eventId = v4();
    this.aggregateId = props.aggregateId;
    this.payload = props;
  }
}
