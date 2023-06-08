import {ArgumentNotProvidedException} from '../exceptions/argument-not-provided.exception';
import {isEmpty} from '../guard/is-empty';

type ValueObjectProps<T> = T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   *  Check if two Value Objects are equal. Checks structural equality.
   * @param vo ValueObject
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(vo);
  }

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (isEmpty(props)) {
      throw new ArgumentNotProvidedException('Property cannot be empty');
    }
  }
}
