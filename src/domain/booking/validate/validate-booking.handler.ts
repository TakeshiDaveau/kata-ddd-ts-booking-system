import { ValidateBookingCommand } from './validate-booking.command';
import { findById, updateById } from '@infrastructure/db/booking.db';
import { isUndefined } from '@lib/guard/is-undefined';
import { EntityNotFoundException } from '@lib/exceptions/entity-not-found.exception';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookingEntity } from '../booking.entity';

@CommandHandler(ValidateBookingCommand)
export class ValidateBookingHandler
  implements ICommandHandler<ValidateBookingCommand>
{
  constructor(private publisher: EventPublisher) {}
  async execute(command: ValidateBookingCommand): Promise<string> {
    const bookingToValidate = findById(command.payload.id);

    if (isUndefined(bookingToValidate)) {
      throw new EntityNotFoundException(
        `BookingEntity with id ${command.payload.id} not found`,
      );
    }

    const booking = this.publisher.mergeObjectContext<BookingEntity>(bookingToValidate);
    booking.validateBooking();
    // booking.commit();

    updateById(booking.id, booking);

    return booking.id;
  }
}
