import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { CustomerType, CustomerStatus } from '../../../entities/customer.entity';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsNotEmpty()
  companyName: string;

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

  @Field(() => CustomerStatus)
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;

  @Field(() => CustomerType)
  @IsEnum(CustomerType)
  @IsNotEmpty()
  customerType: CustomerType;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  jobTitle?: string;
}
