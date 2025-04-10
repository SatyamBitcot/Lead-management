import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class AuthResponseDto {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  user?: User;
}
