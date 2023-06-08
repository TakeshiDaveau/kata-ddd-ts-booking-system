import {SubmitBookingCommand} from '@domain/booking/submit-booking.command';
import {SubmitBookingHandler} from '@domain/booking/submit-booking.handler';
import {CommandBus} from '@tshio/command-bus';
import {Room} from '@domain/booking/room';
import {BookingProps} from '@domain/booking/booking.entity';
import {BookingsDB} from '@infrastructure/db/booking.db';
import {ValidateBookingHandler} from '@domain/booking/validate-booking.handler';
import {ValidateBookingCommand} from '@domain/booking/validate-booking.command';
const selectedRoom: Room = new Room({roomName: 'Room 404 (Valaroom)'});
const booking: BookingProps = {
  arrivalDate: new Date(0),
  departureDate: new Date('12-12-2023'),
  firstName: 'Val',
  lastName: 'Ario',
  status: 'booked',
  room: selectedRoom,
};

export const main = async (): Promise<void> => {
  const bus = new CommandBus([
    new SubmitBookingHandler(),
    new ValidateBookingHandler(),
  ]);

  const bookingId = await RoomBookingSubmitUseCase(bus);

  await RoomBookingValidateUseCase(bus, bookingId);
};

const RoomBookingSubmitUseCase = async (bus: CommandBus): Promise<string> => {
  const bookingCommand = new SubmitBookingCommand(booking);
  return await bus.execute(bookingCommand);
};

const RoomBookingValidateUseCase = async (
  bus: CommandBus,
  id: string
): Promise<void> => {
  const firstCommand = new ValidateBookingCommand({id});
  await bus.execute(firstCommand);
};
