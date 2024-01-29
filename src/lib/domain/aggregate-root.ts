import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';
import { AggregateId } from '@lib/types/aggregate-id';
import { ArgumentNotProvidedException } from '@lib/exceptions/argument-not-provided.exception';
import { ArgumentInvalidException } from '@lib/exceptions/argument-invalid.exception';
import { isEmpty } from '@lib/guard/is-empty';
import { DomainEvent } from './domain-event';

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class AggregateRoot<T> extends NestAggregateRoot {
  private readonly changes: DomainEvent[] = []
  version: number = -1;

  constructor(public readonly streamName: string, id: string) {
    super();
    this.autoCommit = true;
    this.setId(id);
    // this.validateProps(props);
    const now = new Date();
    this._createdAt = now;
    this._updatedAt = now;
    // this.props = props;
    // this.validate();
  }

  protected props: T;

  /**
   * ID is set in the concrete entity implementation to support
   * different ID types depending on your needs.
   * For example it could be a UUID for aggregate root,
   * and shortid / nanoid for child entities.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected _id: AggregateId;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateId {
    return this._id;
  }

  private setId(id: AggregateId): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is AggregateRoot<unknown> {
    return entity instanceof AggregateRoot;
  }

  protected abstract applyChange<T extends DomainEvent>(event: T, isFromHistory?: boolean): void;

  public loadFromHistory(history: DomainEvent[]): void {
    history.forEach((event) => {
      this.applyChange(event, true);
      this.version++;
    })
  }

  /**
   *  Checks if two entities are the same Entity by comparing ID field.
   * @param object Entity
   */
  public equals(object?: AggregateRoot<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!AggregateRoot.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  /**
   * Returns entity properties.
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getProps(): T & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * There are certain rules that always have to be true (invariants)
   * for each entity. Validate method is called every time before
   * saving an entity to the database to make sure those rules are respected.
   */
  public abstract validate(): void;

  private validateProps(props: T): void {
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
  }
}
