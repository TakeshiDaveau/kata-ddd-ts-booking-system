import { Command, CommandProps } from '@lib/domain/command';

type ValidateBookingCommandProps = CommandProps<{ id: string }>;

export class ValidateBookingCommand extends Command<
  CommandProps<ValidateBookingCommandProps>
> {
  constructor(props: ValidateBookingCommandProps) {
    super(props);
  }
}
