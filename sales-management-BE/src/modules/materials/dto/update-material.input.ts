import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { MaterialCategory } from '../../../entities/material.entity';

@InputType()
export class UpdateMaterialInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => MaterialCategory, { nullable: true })
  @IsEnum(MaterialCategory)
  @IsOptional()
  category?: MaterialCategory;

  @Field({ nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stockLevel?: number;

  @Field({ nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minimumStock?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsOptional()
  supplier?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  lowStock?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  unit?: string;
}
