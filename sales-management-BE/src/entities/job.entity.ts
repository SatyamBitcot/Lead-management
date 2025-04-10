import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Customer } from './customer.entity';

export enum JobStatus {
  DESIGN = 'design',
  PRODUCTION = 'production',
  PRINT = 'print',
  APPROVAL = 'approval',
  COMPLETED = 'completed',
}

export enum JobPriority {
  HIGH = 'high',
  NORMAL = 'normal',
  URGENT = 'urgent',
}

registerEnumType(JobStatus, {
  name: 'JobStatus',
  description: 'Job status types',
});

registerEnumType(JobPriority, {
  name: 'JobPriority',
  description: 'Job priority levels',
});

@ObjectType()
@Entity('jobs')
export class Job {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  jobNumber: string;

  @Field()
  @Column()
  name: string;

  @Field(() => JobStatus)
  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DESIGN,
  })
  status: JobStatus;

  @Field(() => JobPriority)
  @Column({
    type: 'enum',
    enum: JobPriority,
    default: JobPriority.NORMAL,
  })
  priority: JobPriority;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Field()
  @Column({ nullable: true })
  assignedTo: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, customer => customer.jobs)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Field()
  @Column()
  customerId: string;

  @Field()
  @Column({ default: false })
  isApproved: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
