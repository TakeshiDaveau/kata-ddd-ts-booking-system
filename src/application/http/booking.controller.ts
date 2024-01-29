import { SubmitBookingCommand } from '@domain/booking/submit/submit-booking.command';
import { ValidateBookingCommand } from '@domain/booking/validate/validate-booking.command';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBookingDto } from './create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  submitBooking(@Body() payload: CreateBookingDto): Promise<any> {
    console.log(payload)
    return this.commandBus.execute(new SubmitBookingCommand({
      bookingId: payload.bookingId,
      arrivalDate: payload.arrivalDate,
      departureDate: payload.departureDate,
      firstName: payload.firstName,
      lastName: payload.lastName,
      room: {
        roomName: payload.roomName
      } as any
    }))
  }

  @Patch(':id/validate')
  validateBooking(@Param('id') id: string): Promise<any> {
    return this.commandBus.execute(new ValidateBookingCommand({ id }))
  }
}
