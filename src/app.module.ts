import { BookingController } from '@application/http/booking.controller';
import { BookingModule } from '@domain/booking/booking.module';
import { PaymentModule } from '@domain/payment/payment.module';
import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';
import { jsonEvent, JSONEventType } from '@eventstore/db-client';
import { EventStore } from '@lib/nestjs-event-store/event-store';
import { NestjsEventStoreModule } from '@lib/nestjs-event-store/nestjs-event-store.module';

type TestEvent = JSONEventType<
  'TestEvent',
  {
    importantData: any;
  }
>;

@Module({
  imports: [
    BookingModule,
    PaymentModule,
    CqrsModule,
    NestjsEventStoreModule.registerAsync(),
  ],
  controllers: [BookingController],
})
export class AppModule {}
