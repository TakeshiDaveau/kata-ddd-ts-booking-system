import { PaymentProps } from './payment.entity';

export type CreatePayment = Omit<PaymentProps, 'status'>;
