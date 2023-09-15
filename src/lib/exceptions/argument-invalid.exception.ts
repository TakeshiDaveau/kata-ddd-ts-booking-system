import { ExceptionBase } from './exception.base';
import { ExceptionCode } from './exception.code';

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCode.ARGUMENT_INVALID;
}
