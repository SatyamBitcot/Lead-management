import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsDate, IsUUID } from 'class-validator';
import { JobStatus, JobPriority } from '../../../entities/job.entity';
import { Type } from 'class-transformer';

@InputType()
export class UpdateJobInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => JobStatus, { nullable: true })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @Field(() => JobPriority, { nullable: true })
  @IsEnum(JobPriority)
  @IsOptional()
  priority?: JobPriority;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  isApproved?: boolean;
}
