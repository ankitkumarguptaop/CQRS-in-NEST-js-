import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from '../signin-user.command';
import { UserService } from '../../user.service';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: SignInUserCommand) {
    const user = await this.userService.signIn(command.signInUserDto);
    const token = this.userService.generateToken(user.id);
    return { user, token };
  }
}
