import {CommandHandler} from '@tshio/command-bus';
import {SubmitBookingCommand} from './submit-booking.command';
import {BookingEntity} from './booking.entity';

export class SubmitBookingHandler
  implements CommandHandler<SubmitBookingCommand>
{
  public commandType = SubmitBookingCommand.type;

  async execute(command: SubmitBookingCommand): Promise<void> {
    const booking = BookingEntity.create(command.payload);
    booking.publishEvents();
  }
}
