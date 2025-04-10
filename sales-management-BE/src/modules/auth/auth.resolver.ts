import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { AuthResponseDto } from './dto/auth.response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async login(
    @Args('username', { description: 'The email of the user' }) username: string,
    @Args('password') password: string
  ): Promise<AuthResponseDto> {
    return this.authService.login(username, password);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: User): Promise<boolean> {
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async validateToken(@Args('token') token: string): Promise<boolean> {
    const user = await this.authService.validateToken(token);
    return !!user;
  }
}
