import {SubmitBookingCommand} from '@domain/booking/submit-booking.command';
import {SubmitBookingHandler} from '@domain/booking/submit-booking.handler';
import {CommandBus} from '@tshio/command-bus';

const main = async (): Promise<void> => {
  const bookingCommand = new SubmitBookingCommand({roomName: 'toto'});

  const bus = new CommandBus([new SubmitBookingHandler()]);

  const result = await bus.execute(bookingCommand);

  console.log(result);
};

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
