import {Command, CommandProps} from '@lib/domain/command';
import {BookingProps} from './booking.entity';

type ValidateBookingCommandProps = CommandProps<BookingProps>;

export class ValidateBookingCommand extends Command<
  CommandProps<ValidateBookingCommandProps>
> {
  static readonly type = 'ValidateBookingCommand';
  constructor(booking: ValidateBookingCommandProps) {
    super('ValidateBookingCommand', booking);
  }
}
