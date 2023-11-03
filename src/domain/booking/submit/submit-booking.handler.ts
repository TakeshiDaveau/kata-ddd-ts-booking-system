import {SubmitBookingCommand} from './submit-booking.command';
import {BookingEntity} from '../booking.entity';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookingsDB } from '@infrastructure/db/booking.db';

@CommandHandler(SubmitBookingCommand)
export class SubmitBookingHandler implements ICommandHandler<SubmitBookingCommand> {
  constructor(
    private publisher: EventPublisher,
  ) {
  }
  async execute(command: SubmitBookingCommand): Promise<string> {
    const booking = this.publisher.mergeObjectContext<BookingEntity>(BookingEntity.create(command.payload));

    BookingsDB.push(booking);
    booking.submitBooking()
    // booking.commit();
    return booking.id;
  }
}
