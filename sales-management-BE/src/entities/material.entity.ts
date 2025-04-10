import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';

export enum MaterialCategory {
  SUBSTRATE = 'substrate',
  VINYL = 'vinyl',
}

registerEnumType(MaterialCategory, {
  name: 'MaterialCategory',
  description: 'Material category types',
});

@ObjectType()
@Entity('materials')
export class Material {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  materialId: string; // e.g., m001, m002

  @Field()
  @Column()
  name: string;

  @Field(() => MaterialCategory)
  @Column({
    type: 'enum',
    enum: MaterialCategory,
  })
  category: MaterialCategory;

  @Field()
  @Column({ type: 'int' })
  stockLevel: number;

  @Field()
  @Column({ type: 'int' })
  minimumStock: number;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field()
  @Column()
  supplier: string;

  @Field()
  @Column({ default: false })
  lowStock: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  unit: string; // e.g., sheets, rolls

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
