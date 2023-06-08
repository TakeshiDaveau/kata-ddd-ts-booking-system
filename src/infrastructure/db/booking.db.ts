import {BookingEntity} from '@domain/booking/booking.entity';

export const BookingsDB: Array<BookingEntity> = [];

export const save = (entity: BookingEntity): void => {
  BookingsDB.push(entity);
};
export const findById = (id: string): BookingEntity | undefined => {
  return BookingsDB.find(booking => booking.id === id);
};
