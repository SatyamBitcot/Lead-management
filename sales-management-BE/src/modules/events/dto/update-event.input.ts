import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID, IsDate } from 'class-validator';
import { EventType } from '../../../entities/event.entity';
import { Type } from 'class-transformer';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => EventType, { nullable: true })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

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
