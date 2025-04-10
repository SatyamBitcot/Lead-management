import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsEnum } from 'class-validator';
import { CustomerType, CustomerStatus } from '../../../entities/customer.entity';

@InputType()
export class UpdateCustomerInput {
  @Field({ nullable: true })
  @IsOptional()
  companyName?: string;

  @Field({ nullable: true })
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  state?: string;

  @Field({ nullable: true })
  @IsOptional()
  zipCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;

  @Field(() => CustomerStatus, { nullable: true })
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;

  @Field(() => CustomerType, { nullable: true })
  @IsEnum(CustomerType)
  @IsOptional()
  customerType?: CustomerType;

  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  jobTitle?: string;
}
