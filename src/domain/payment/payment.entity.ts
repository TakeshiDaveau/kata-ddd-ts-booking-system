import {save} from '@infrastructure/db/payment.db';
import {AggregateRoot} from '@lib/domain/aggregate-root';
import {AggregateId} from '@lib/types/aggregate-id';
import {v4} from 'uuid';
import {PaymentRequestedEvent} from './payment-requested.event';
import {CreatePayment} from './payment.type';

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
  // Ce _id est setté dans le constructeur d'une entity
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected readonly _id: AggregateId;

  public validate(): void {}

  static create(createProps: CreatePayment): PaymentEntity {
    const id = v4();
    const props: PaymentProps = {...createProps, status: 'pending'};
    const payment = new PaymentEntity({id, props});

    // Save to database
    save(payment);

    // Save the event
    payment.addEvent(
      new PaymentRequestedEvent({
        aggregateId: id,
        ...props,
      })
    );
    return payment;
  }
}
