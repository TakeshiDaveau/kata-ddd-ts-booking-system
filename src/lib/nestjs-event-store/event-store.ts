import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  EventStoreDBClient,
  jsonEvent,
  persistentSubscriptionToStreamSettingsFromDefaults,
} from '@eventstore/db-client';
import {
  EventBus,
  IEvent,
  IEventPublisher,
  IMessageSource,
} from '@nestjs/cqrs';
import { isUndefined } from '@lib/guard/is-undefined';
import { AggregateRoot } from '@lib/domain/aggregate-root';
import { DomainEvent } from '@lib/domain/domain-event';
import { Subject } from 'rxjs';

@Injectable()
export class EventStore
  implements IEventPublisher, OnModuleDestroy, OnModuleInit, IMessageSource
{
  public client: EventStoreDBClient;
  private subject$: Subject<IEvent>;
  constructor(private readonly eventsBus: EventBus, connectionString: string) {
    this.client = EventStoreDBClient.connectionString(`${connectionString}`);

    this.subscribeToPersistentSubscription('$et-BookingSubmittedEvent', 'kata');
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
  onModuleInit() {
    // this.subject$ = (this.eventsBus as any).subject$;
    this.bridgeEventsTo((this.eventsBus as any).subject$);
    this.eventsBus.publisher = this;
  }

  async publish<TEvent extends IEvent>(
    event: TEvent,
    context: AggregateRoot<unknown>,
  ) {
    if (isUndefined(event) && isUndefined(context)) {
      return;
    }
    if (event === null) {
      return;
    }
    const eventForEventStore = jsonEvent<any>({
      id: (event as unknown as DomainEvent).eventId,
      type: event.constructor.name,
      data: (event as unknown as DomainEvent).payload,
    });
    try {
      await this.client.appendToStream(context.streamName, eventForEventStore);
    } catch (err) {
      console.error(err);
    }
  }
  publishAll?<TEvent extends IEvent>(events: TEvent[], stream: string) {
    throw new Error('Method not implemented');
  }
  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    this.subject$ = subject;
  }

  private handleEvent(event: any) {
    // TODO
  }

  private async subscribeToPersistentSubscription(
    stream: string,
    subscriptionName: string,
  ): Promise<void> {
    try {
      console.log(`
       Connecting to persistent subscription ${subscriptionName} on stream ${stream}!
      `);

      await this.client.createPersistentSubscriptionToStream(
        stream,
        subscriptionName,
        persistentSubscriptionToStreamSettingsFromDefaults(),
      );

      const subscription =
        await this.client.subscribeToPersistentSubscriptionToStream(
          stream,
          subscriptionName,
        );

      try {
        for await (const event of subscription) {
          console.log(
            `handling event ${event.event?.type} with retryCount ${event.retryCount}`,
          );
          await this.handleEvent(event);
          await subscription.ack(event);
        }
      } catch (error) {
        console.log(`Subscription was dropped. ${error}`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
