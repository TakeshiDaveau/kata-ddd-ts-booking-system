import { BookingValidatedEvent } from './booking-validated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { updateById } from '@infrastructure/db/booking.db';

@EventsHandler(BookingValidatedEvent)
export class BookingValidatedEventHandler   implements IEventHandler<BookingValidatedEvent>
{
  handle(event: BookingValidatedEvent) {
    // updateById(event.payload.aggregateId, event.payload as any);
  }
}
