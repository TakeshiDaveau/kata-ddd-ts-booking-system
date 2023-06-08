import {CommandHandler} from '@tshio/command-bus';
import {ValidateBookingCommand} from './validate-booking.command';
import {BookingEntity} from './booking.entity';

export class ValidateBookingHandler
  implements CommandHandler<ValidateBookingCommand>
{
  public commandType = ValidateBookingCommand.type;

  async execute(command: ValidateBookingCommand): Promise<void> {
    const booking = BookingEntity.validateBooking(command.payload);
    booking.publishEvents();
  }
}
