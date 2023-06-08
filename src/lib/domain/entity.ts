import {ArgumentInvalidException} from '@lib/exceptions/argument-invalid.exception';
import {ArgumentNotProvidedException} from '@lib/exceptions/argument-not-provided.exception';
import {isEmpty} from '@lib/guard/is-empty';
import {AggregateId} from '@lib/types/aggregate-id';

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

export abstract class Entity<EntityProps> {
  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    this.validate();
  }

  protected readonly props: EntityProps;

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

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   *  Checks if two entities are the same Entity by comparing ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  /**
   * Returns entity properties.
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getProps(): EntityProps & BaseEntityProps {
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

  private validateProps(props: EntityProps): void {
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty'
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
  }
}
