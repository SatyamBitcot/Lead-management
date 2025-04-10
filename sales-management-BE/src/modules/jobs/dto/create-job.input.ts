import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsOptional, IsDate, IsUUID } from 'class-validator';
import { JobStatus, JobPriority } from '../../../entities/job.entity';
import { Type } from 'class-transformer';

@InputType()
export class CreateJobInput {
  @Field()
  @IsNotEmpty()
  jobNumber: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => JobStatus, { defaultValue: JobStatus.DESIGN })
  @IsEnum(JobStatus)
  @IsOptional()
  status: JobStatus;

  @Field(() => JobPriority, { defaultValue: JobPriority.NORMAL })
  @IsEnum(JobPriority)
  @IsOptional()
  priority: JobPriority;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  assignedTo?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @Field({ defaultValue: false })
  @IsOptional()
  isApproved: boolean;
}
