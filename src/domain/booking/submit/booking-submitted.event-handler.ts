import { DomainEvent, DomainEventProps } from '@lib/domain/domain-event';
import { BookingProps } from '../booking.entity';
import { BookingSubmittedEvent } from './booking-submitted.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookingsDB } from '@infrastructure/db/booking.db';

@EventsHandler(BookingSubmittedEvent)
export class BookingSubmittedEventHandler
  implements IEventHandler<BookingSubmittedEvent>
{


  handle(event: BookingSubmittedEvent) {
      // Trigger notification pour l'hotel
  }
}
