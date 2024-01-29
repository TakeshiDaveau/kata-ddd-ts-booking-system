import {SubmitBookingCommand} from './submit-booking.command';
import {BookingEntity} from '../booking.entity';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventStore } from '../../../lib/nestjs-event-store/event-store';

@CommandHandler(SubmitBookingCommand)
export class SubmitBookingHandler implements ICommandHandler<SubmitBookingCommand> {
  constructor(
    private publisher: EventPublisher,
    private eventStore: EventStore
  ) {
  }
  async execute(command: SubmitBookingCommand): Promise<string> {
    // Vérifier que le stream n'existe pas déjà, sinon throw une erreur
    const { payload } = command
    const { bookingId: id} = payload

    // Should be in a repository from here
    const booking = BookingEntity.createEmpty(id);

    const history = await this.eventStore.readAllFromStream(BookingEntity.getStreamName(id));
    console.log(history);
    booking.loadFromHistory(history);

    if(booking.version !== -1) {
      throw new Error('Booking already exists')
    }
    
    this.publisher.mergeObjectContext(booking)
    booking.submitBooking(payload as any)
    return booking.id;
  }
}
