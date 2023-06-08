import {Command, CommandProps} from '@lib/domain/command';

type ValidateBookingCommandProps = CommandProps<{id: string}>;

export class ValidateBookingCommand extends Command<
  CommandProps<ValidateBookingCommandProps>
> {
  static readonly type = 'ValidateBookingCommand';
  constructor(props: ValidateBookingCommandProps) {
    super('ValidateBookingCommand', props);
  }
}
