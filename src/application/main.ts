import {SubmitBookingCommand} from '@domain/booking/submit-booking.command';
import {SubmitBookingHandler} from '@domain/booking/submit-booking.handler';
import {CommandBus} from '@tshio/command-bus';
import {Room} from '@domain/booking/room';
import {BookingProps} from '@domain/booking/booking.entity';
import {ValidateBookingCommand} from '@domain/booking/validate-booking.command';
import {ValidateBookingHandler} from '@domain/booking/validate-booking.handler';
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

  await RoomBookingSubmitUseCase(bus);

  await RoomBookingValidateUseCase(bus);
};

const RoomBookingSubmitUseCase = async (bus: CommandBus): Promise<void> => {
  const bookingCommand = new SubmitBookingCommand(booking);
  await bus.execute(bookingCommand);
};

const RoomBookingValidateUseCase = async (bus: CommandBus): Promise<void> => {
  const validateBookingCommand = new ValidateBookingCommand(booking);
  await bus.execute(validateBookingCommand);

  // const requestPaymentCommand = new RequestPaymentCommand(payment);
  // await bus.execute(requestPaymentCommand);
};
