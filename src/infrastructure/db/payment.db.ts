import { PaymentEntity } from '@domain/payment/payment.entity';

export const PaymentsDB: Array<PaymentEntity> = [];

export const save = (entity: PaymentEntity): void => {
  PaymentsDB.push(entity);
};
export const findById = (id: string): PaymentEntity | undefined => {
  return PaymentsDB.find((booking) => booking.id === id);
};
export const updateById = (
  id: string,
  entity: PaymentEntity,
): PaymentEntity => {
  const index = PaymentsDB.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    PaymentsDB[index] = entity;
  }
  return entity;
};
