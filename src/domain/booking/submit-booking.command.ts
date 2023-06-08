import {Command, CommandProps} from '@lib/domain/command';
import {BookingProps} from './booking.entity';

type SubmitBookingCommandProps = CommandProps<BookingProps>;

export class SubmitBookingCommand extends Command<
  CommandProps<SubmitBookingCommandProps>
> {
  static readonly type = 'SubmitBookingCommand';
  constructor(props: SubmitBookingCommandProps) {
    super('SubmitBookingCommand', props);
  }
}
