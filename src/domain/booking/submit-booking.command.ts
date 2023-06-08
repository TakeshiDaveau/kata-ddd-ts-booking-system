import {Command, CommandProps} from '@lib/domain/command';
import {CreateBooking} from './booking.type';

type SubmitBookingCommandProps = CommandProps<CreateBooking>;

export class SubmitBookingCommand extends Command<
  CommandProps<SubmitBookingCommandProps>
> {
  static readonly type = 'SubmitBookingCommand';
  constructor(props: SubmitBookingCommandProps) {
    super('SubmitBookingCommand', props);
  }
}
