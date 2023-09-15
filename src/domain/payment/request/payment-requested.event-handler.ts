import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PaymentRequestedEvent } from './payment-requested.event';

@EventsHandler(PaymentRequestedEvent)
export class PaymentRequestedEventHandler
  implements IEventHandler<PaymentRequestedEvent>
{


  handle(event: PaymentRequestedEvent) {
      // Trigger notification pour l'hotel
  }
}
