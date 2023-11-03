import { SubmitBookingCommand } from '@domain/booking/submit/submit-booking.command';
import { ValidateBookingCommand } from '@domain/booking/validate/validate-booking.command';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('bookings')
export class BookingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  submitBooking(@Body() payload: any): Promise<any> {
    console.log(payload)
    return this.commandBus.execute(new SubmitBookingCommand(payload))
  }

  @Patch(':id/validate')
  validateBooking(@Param('id') id: string): Promise<any> {
    return this.commandBus.execute(new ValidateBookingCommand({ id }))
  }
}
