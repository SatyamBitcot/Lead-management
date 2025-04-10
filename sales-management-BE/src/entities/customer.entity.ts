import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Job } from './job.entity';

export enum CustomerType {
  CORPORATE = 'corporate',
  SMALL_BUSINESS = 'small_business',
  INDIVIDUAL = 'individual',
  NON_PROFIT = 'non_profit'
}

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked'
}

registerEnumType(CustomerType, {
  name: 'CustomerType',
  description: 'Customer type categories'
});

registerEnumType(CustomerStatus, {
  name: 'CustomerStatus',
  description: 'Customer status options'
});

@ObjectType()
@Entity('customers')
export class Customer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: 'Default Company' })
  companyName: string;

  @Field()
  @Column({ default: 'First Name' })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  website: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  state: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  zipCode: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Field(() => CustomerStatus)
  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE
  })
  status: CustomerStatus;

  @Field(() => CustomerType)
  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.SMALL_BUSINESS
  })
  customerType: CustomerType;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobTitle: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Job, job => job.customer)
  jobs: Job[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
