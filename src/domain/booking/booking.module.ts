import { Module } from '@nestjs/common';
import { SubmitBookingHandler } from './submit/submit-booking.handler';

const commandHandlers = [SubmitBookingHandler];

@Module({
  providers: [...commandHandlers],
})
export class BookingModule {}
