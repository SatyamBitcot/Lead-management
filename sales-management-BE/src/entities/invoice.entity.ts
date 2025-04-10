import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Customer } from './customer.entity';
import { Job } from './job.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

registerEnumType(InvoiceStatus, {
  name: 'InvoiceStatus',
  description: 'Invoice status types',
});

@ObjectType()
@Entity('invoices')
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  invoiceNumber: string; // e.g., INV-2023-1001

  @Field(() => Customer)
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Field()
  @Column()
  customerId: string;

  @Field(() => Job)
  @ManyToOne(() => Job)
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Field()
  @Column()
  jobId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  issueDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Field(() => InvoiceStatus)
  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.DRAFT,
  })
  status: InvoiceStatus;

  @Field()
  @Column({ default: false })
  quickbooksSynced: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
