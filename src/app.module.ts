import { BookingModule } from '@domain/booking/booking.module';
import { PaymentModule } from '@domain/payment/payment.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [BookingModule, PaymentModule],
})
export class AppModule {}
