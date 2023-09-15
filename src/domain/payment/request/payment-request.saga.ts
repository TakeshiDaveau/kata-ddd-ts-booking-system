import { BookingValidatedEvent } from "@domain/booking/validate/booking-validated.event";
import { Injectable } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { Observable, map } from "rxjs";
import { RequestPaymentCommand } from "./request-payment.command";

@Injectable()
export class PaymentRequestSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BookingValidatedEvent),
      map((event) => {
        console.log('saga africa la danse de la mousse')
        return new RequestPaymentCommand({bookingId: event.payload.aggregateId, amount: 1000, currency: '€' })
      }),
    );
  }
}