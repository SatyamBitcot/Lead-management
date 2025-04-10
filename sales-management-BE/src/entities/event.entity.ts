import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Job } from './job.entity';

export enum EventType {
  INSTALLATION = 'installation',
  MEETING = 'meeting',
  DEADLINE = 'deadline',
  REMINDER = 'reminder',
}

registerEnumType(EventType, {
  name: 'EventType',
  description: 'Event type categories',
});

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => EventType)
  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobId: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
