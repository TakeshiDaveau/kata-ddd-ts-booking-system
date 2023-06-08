import {DomainEvent} from './domain-event';
import {Entity} from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(): Promise<void> {
    this._domainEvents.forEach(event =>
      console.log(
        `Events ${event.constructor.name} published\n${JSON.stringify(
          event,
          null,
          2
        )}\n`
      )
    );

    this.clearEvents();
  }
}
