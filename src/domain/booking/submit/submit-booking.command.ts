import { Command, CommandProps } from '@lib/domain/command';
import { CreateBooking } from '../booking.type';
import { CommandHandler } from '@nestjs/cqrs';
import { BookingSubmittedEvent } from './booking-submitted.event';

type SubmitBookingCommandProps = CommandProps<CreateBooking>;

@CommandHandler(BookingSubmittedEvent)
export class SubmitBookingCommand extends Command<
  CommandProps<SubmitBookingCommandProps>
> {
  constructor(props: SubmitBookingCommandProps) {
    super(props);
  }
}
