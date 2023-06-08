import {ExceptionBase} from './exception.base';
import {ExceptionCode} from './exception.code';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExceptionCode.ARGUMENT_NOT_PROVIDED;
}
