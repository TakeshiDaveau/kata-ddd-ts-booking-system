import { BookingEntity } from '@domain/booking/booking.entity';

export const BookingsDB: Array<BookingEntity> = [];

export const save = (entity: BookingEntity): void => {
  BookingsDB.push(entity);
};
export const findById = (id: string): BookingEntity | undefined => {
  return BookingsDB.find((booking) => booking.id === id);
};
export const updateById = (
  id: string,
  entity: BookingEntity,
): BookingEntity => {
  const index = BookingsDB.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    BookingsDB[index] = entity;
  }
  return entity;
};
