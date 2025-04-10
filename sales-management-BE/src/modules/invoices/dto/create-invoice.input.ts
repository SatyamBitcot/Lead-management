import { InputType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { InvoiceStatus } from '../../../entities/invoice.entity';
import { Type } from 'class-transformer';

@InputType()
export class CreateInvoiceInput {
  @Field()
  @IsNotEmpty()
  invoiceNumber: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  jobId: string;

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

  @Field(() => Float)
  @IsNumber()
  amount: number;

  @Field(() => InvoiceStatus, { defaultValue: InvoiceStatus.DRAFT })
  @IsEnum(InvoiceStatus)
  @IsOptional()
  status: InvoiceStatus;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  quickbooksSynced: boolean;
}
