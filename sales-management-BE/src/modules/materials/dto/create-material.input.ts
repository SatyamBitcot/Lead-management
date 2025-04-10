import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { MaterialCategory } from '../../../entities/material.entity';

@InputType()
export class CreateMaterialInput {
  @Field()
  @IsNotEmpty()
  materialId: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => MaterialCategory)
  @IsEnum(MaterialCategory)
  @IsNotEmpty()
  category: MaterialCategory;

  @Field()
  @IsNumber()
  @Min(0)
  stockLevel: number;

  @Field()
  @IsNumber()
  @Min(0)
  minimumStock: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field()
  @IsNotEmpty()
  supplier: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  lowStock: boolean;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  unit?: string;
}
