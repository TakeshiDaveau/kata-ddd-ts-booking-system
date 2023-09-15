import { BookingController } from '@application/http/booking.controller';
import { BookingModule } from '@domain/booking/booking.module';
import { PaymentModule } from '@domain/payment/payment.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';


@Module({
  imports: [BookingModule, PaymentModule, CqrsModule],
  controllers: [BookingController]
})
export class AppModule {}
