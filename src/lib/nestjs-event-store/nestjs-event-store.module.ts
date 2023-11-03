import { DynamicModule, Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { CqrsModule, EventBus } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
})
export class NestjsEventStoreModule {
  static registerAsync(): DynamicModule {
    const eventStoreProviders = {
      provide: EventStore,
      useFactory: (eventBus: EventBus) =>
        new EventStore(eventBus, 'esdb://localhost:2113?tls=false'),
      inject: [EventBus],
    };

    return {
      module: NestjsEventStoreModule,
      providers: [eventStoreProviders],
      exports: [eventStoreProviders],
    };
  }
}
