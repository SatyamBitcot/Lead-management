import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../../../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ defaultValue: false })
  isTwoFactorEnabled: boolean;

  @Field({ defaultValue: true })
  isActive: boolean;
}
