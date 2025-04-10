import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsOptional, IsUUID, IsDate } from 'class-validator';
import { EventType } from '../../../entities/event.entity';
import { Type } from 'class-transformer';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field(() => EventType)
  @IsEnum(EventType)
  @IsNotEmpty()
  type: EventType;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startTime?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endTime?: Date;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  jobId?: string;
}
