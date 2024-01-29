import { ValidateBookingCommand } from './validate-booking.command';
import { findById, updateById } from '@infrastructure/db/booking.db';
import { isUndefined } from '@lib/guard/is-undefined';
import { EntityNotFoundException } from '@lib/exceptions/entity-not-found.exception';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookingEntity } from '../booking.entity';
import { EventStore } from '@lib/nestjs-event-store/event-store';

@CommandHandler(ValidateBookingCommand)
export class ValidateBookingHandler
  implements ICommandHandler<ValidateBookingCommand>
{
  constructor(private publisher: EventPublisher, 
    private eventStore: EventStore) {}
  async execute(command: ValidateBookingCommand): Promise<string> {
    // const bookingToValidate = findById(command.payload.id);

    // if (isUndefined(bookingToValidate)) {
    //   throw new EntityNotFoundException(
    //     `BookingEntity with id ${command.payload.id} not found`,
    //   );
    // }

    // const booking = this.publisher.mergeObjectContext<BookingEntity>(bookingToValidate);
    // booking.validateBooking();
    // // booking.commit();

    // updateById(booking.id, booking);

    // return booking.id;

    // Vérifier que le stream n'existe pas déjà, sinon throw une erreur
    // const { payload: { bookingId: id} } = command
    const id = 'toto';

    // Should be in a repository from here
    const booking = BookingEntity.createEmpty(id);

    const history = await this.eventStore.readAllFromStream(BookingEntity.getStreamName(id));
    booking.loadFromHistory(history);

    if(booking.version === -1) {
      throw new Error('Booking not found')
    }
    booking.validateBooking()
    return booking.id;
  }
}
