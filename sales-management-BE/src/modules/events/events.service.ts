import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  // Create a new event
  async createEvent(createEventInput: CreateEventInput): Promise<Event> {
    try {
      // Validate that end time is after start time
      if (createEventInput.endTime <= createEventInput.startTime) {
        throw new BadRequestException('End time must be after start time');
      }

      const newEvent = this.eventRepository.create(createEventInput);
      return this.eventRepository.save(newEvent);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all events
  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['job'],
    });
  }

  // Find events by date range
  async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.eventRepository.find({
      where: [
        // Events that start within the range
        { startTime: Between(startDate, endDate) },
        // Events that end within the range
        { endTime: Between(startDate, endDate) },
        // Events that span the entire range
        {
          startTime: LessThanOrEqual(startDate),
          endTime: MoreThanOrEqual(endDate),
        },
      ],
      relations: ['job'],
      order: {
        startTime: 'ASC',
      },
    });
  }

  // Find events for today
  async findToday(): Promise<Event[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.findByDateRange(today, tomorrow);
  }

  // Find events for tomorrow
  async findTomorrow(): Promise<Event[]> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    
    return this.findByDateRange(tomorrow, dayAfterTomorrow);
  }

  // Find events by type
  async findByType(type: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: { type: type as any },
      relations: ['job'],
      order: {
        startTime: 'ASC',
      },
    });
  }

  // Find events by job
  async findByJob(jobId: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: { jobId },
      relations: ['job'],
      order: {
        startTime: 'ASC',
      },
    });
  }

  // Find a event by ID
  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['job'],
    });
    
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    
    return event;
  }

  // Update an event
  async updateEvent(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    try {
      const event = await this.findOne(id);
      
      // If updating times, validate that end time is after start time
      if (updateEventInput.startTime || updateEventInput.endTime) {
        const startTime = updateEventInput.startTime || event.startTime;
        const endTime = updateEventInput.endTime || event.endTime;
        
        if (endTime <= startTime) {
          throw new BadRequestException('End time must be after start time');
        }
      }
      
      Object.assign(event, updateEventInput);
      return this.eventRepository.save(event);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Delete an event
  async deleteEvent(id: string): Promise<boolean> {
    try {
      const event = await this.findOne(id);
      await this.eventRepository.remove(event);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
