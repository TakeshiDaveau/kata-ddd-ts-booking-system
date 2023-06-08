import {CommandHandler} from '@tshio/command-bus';
import {ValidateBookingCommand} from './validate-booking.command';
import {findById} from '@infrastructure/db/booking.db';
import {isUndefined} from '@lib/guard/is-undefined';
import {EntityNotFoundException} from '@lib/exceptions/entity-not-found.exception';

export class ValidateBookingHandler
  implements CommandHandler<ValidateBookingCommand>
{
  public commandType = ValidateBookingCommand.type;

  async execute(command: ValidateBookingCommand): Promise<void> {
    const bookingToValidate = findById(command.payload.id);
    if (isUndefined(bookingToValidate)) {
      throw new EntityNotFoundException(
        `BookingEntity with id ${command.payload.id} not found`
      );
    }
    bookingToValidate.validateBooking();
    bookingToValidate.publishEvents();
  }
}
