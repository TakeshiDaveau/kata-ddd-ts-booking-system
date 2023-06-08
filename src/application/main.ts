import {SubmitBookingCommand} from '@domain/booking/submit-booking.command';
import {SubmitBookingHandler} from '@domain/booking/submit-booking.handler';
import {CommandBus} from '@tshio/command-bus';
import {Room} from '@domain/booking/room';

export const main = async (): Promise<void> => {
  const bus = new CommandBus([new SubmitBookingHandler()]);

  await RoomBookingSubmitUseCase(bus);

  await RoomBookingValidateUseCase(bus);
};

const RoomBookingSubmitUseCase = async (bus: CommandBus): Promise<void> => {
  const selectedRoom = new Room({roomName: 'Room 404 (Valaroom)'});

  const bookingCommand = new SubmitBookingCommand({
    arrivalDate: new Date(0),
    departureDate: new Date('12-12-2023'),
    firstName: 'Val',
    lastName: 'Ario',
    status: 'booked',
    room: selectedRoom,
  });
  await bus.execute(bookingCommand);
};

const RoomBookingValidateUseCase = async (bus: CommandBus): Promise<void> => {
  // await bus.execute(bookingCommand);
};
