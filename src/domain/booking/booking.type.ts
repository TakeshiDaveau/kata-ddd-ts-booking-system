import {BookingProps} from './booking.entity';

export type CreateBooking = Omit<BookingProps, 'status'>;
