import { ExceptionBase } from './exception.base';
import { ExceptionCode } from './exception.code';

/**
 * Used to indicate that the entity you're looking for doesn't exist
 *
 * @class EntityNotFoundException
 * @extends {ExceptionBase}
 */
export class EntityNotFoundException extends ExceptionBase {
  readonly code = ExceptionCode.ENTITY_NOT_FOUND;
}
