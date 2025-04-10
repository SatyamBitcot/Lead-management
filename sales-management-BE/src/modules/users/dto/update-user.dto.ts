import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../../../entities/user.entity';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field({ nullable: true })
  isTwoFactorEnabled?: boolean;

  @Field({ nullable: true })
  isActive?: boolean;
}
