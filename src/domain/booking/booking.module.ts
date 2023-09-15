import { Module } from '@nestjs/common';
import { SubmitBookingHandler } from './submit/submit-booking.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateBookingHandler } from './validate/validate-booking.handler';

const commandHandlers = [SubmitBookingHandler, ValidateBookingHandler];

@Module({
  providers: [...commandHandlers],
  imports: [CqrsModule]
})
export class BookingModule {}
