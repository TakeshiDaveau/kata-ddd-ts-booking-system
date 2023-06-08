import {BookingEntity} from '@domain/booking/booking.entity';
import {AggregateRoot} from '@lib/domain/aggregate-root';
import {AggregateId} from '@lib/types/aggregate-id';
import {v4} from 'uuid';
import {PaymentRequestedEvent} from './payment-request.event';

type PaymentAmount = number;

type Currency = string;

export type PaymentProps = {
  status: 'pending' | 'valid';
  amount: PaymentAmount;
  currency: Currency;
  bookingId: typeof v4;
};

export class PaymentEntity extends AggregateRoot<PaymentProps> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  protected readonly _id: AggregateId;

  public validate(): void {}

  static create(createProps: PaymentProps): PaymentEntity {
    const id = v4();
    const props: PaymentProps = {...createProps};
    const payment = new PaymentEntity({id, props});

    payment.addEvent(
      new PaymentRequestedEvent({
        aggregateId: id,
        ...props,
      })
    );
    return payment;
  }
}
