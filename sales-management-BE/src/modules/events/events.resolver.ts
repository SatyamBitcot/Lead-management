import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './events.service';
import { Event } from '../../entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Query(() => [Event])
  async getEventsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<Event[]> {
    return this.eventService.findByDateRange(startDate, endDate);
  }

  @Query(() => [Event])
  async getTodayEvents(): Promise<Event[]> {
    return this.eventService.findToday();
  }

  @Query(() => [Event])
  async getTomorrowEvents(): Promise<Event[]> {
    return this.eventService.findTomorrow();
  }

  @Query(() => [Event])
  async getEventsByType(@Args('type') type: string): Promise<Event[]> {
    return this.eventService.findByType(type);
  }

  @Query(() => [Event])
  async getEventsByJob(@Args('jobId') jobId: string): Promise<Event[]> {
    return this.eventService.findByJob(jobId);
  }

  @Query(() => Event)
  async getEvent(@Args('id') id: string): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventService.createEvent(createEventInput);
  }

  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ): Promise<Event> {
    return this.eventService.updateEvent(id, updateEventInput);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Args('id') id: string): Promise<boolean> {
    return this.eventService.deleteEvent(id);
  }
}
