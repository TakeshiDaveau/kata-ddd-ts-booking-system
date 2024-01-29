import { AggregateRoot } from '@lib/domain/aggregate-root';
import { AggregateId } from '@lib/types/aggregate-id';
import { v4 } from 'uuid';
import { CreatePayment } from './payment.type';
import { PaymentRequestedEvent } from './request/payment-requested.event';
import { DomainEvent } from '../../lib/domain/domain-event';

export type PaymentStatus = 'pending' | 'valid';

export type Amount = number;
export const isAmount = (value: unknown): value is Amount => {
  return (
    typeof value === 'number' && value > 0 && value <= Number.MAX_SAFE_INTEGER
  );
};
export type Currency = '$' | '€' | '£';

export interface PaymentProps {
  status: PaymentStatus;
  amount: Amount;
  currency: Currency;
  bookingId: string;
}

export class PaymentEntity extends AggregateRoot<PaymentProps> {
  protected applyChange(event: DomainEvent): void {
    throw new Error('Method not implemented.');
  }
  // Ce _id est setté dans le constructeur d'une entity
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected readonly _id: AggregateId;

  public validate(): void {

  }

  submitPaymentRequest(): PaymentEntity {
    this.apply(
      new PaymentRequestedEvent({
        aggregateId: this.id,
        ...this.props,
      })
    );
    return this;
  }
}
