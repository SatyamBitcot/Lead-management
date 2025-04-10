import { InputType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { InvoiceStatus } from '../../../entities/invoice.entity';
import { Type } from 'class-transformer';

@InputType()
export class UpdateInvoiceInput {
  @Field({ nullable: true })
  @IsOptional()
  invoiceNumber?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  jobId?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  issueDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @Field(() => InvoiceStatus, { nullable: true })
  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  quickbooksSynced?: boolean;
}
