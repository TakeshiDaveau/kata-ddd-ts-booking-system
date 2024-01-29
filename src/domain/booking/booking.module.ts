import { Module } from '@nestjs/common';
import { SubmitBookingHandler } from './submit/submit-booking.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateBookingHandler } from './validate/validate-booking.handler';
import { NestjsEventStoreModule } from '../../lib/nestjs-event-store/nestjs-event-store.module';

const commandHandlers = [SubmitBookingHandler, ValidateBookingHandler];

@Module({
  providers: [...commandHandlers],
  imports: [CqrsModule, NestjsEventStoreModule.registerAsync()]
})
export class BookingModule {}
