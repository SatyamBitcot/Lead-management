import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Job } from '../../entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  // Create a new job
  async createJob(createJobInput: CreateJobInput): Promise<Job> {
    try {
      // Check if job number already exists
      const existingJob = await this.jobRepository.findOne({
        where: { jobNumber: createJobInput.jobNumber },
      });

      if (existingJob) {
        throw new BadRequestException('Job number already exists');
      }

      const newJob = this.jobRepository.create(createJobInput);
      return this.jobRepository.save(newJob);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all jobs
  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      relations: ['customer'],
    });
  }

  // Find jobs by status
  async findByStatus(status: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { status: status as any },
      relations: ['customer'],
    });
  }

  // Find jobs by customer
  async findByCustomer(customerId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { customerId },
      relations: ['customer'],
    });
  }

  // Find jobs due in the next X days
  async findUpcoming(days: number): Promise<Job[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return this.jobRepository.find({
      where: {
        dueDate: Between(today, futureDate),
      },
      relations: ['customer'],
    });
  }

  // Find a job by ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    
    return job;
  }

  // Update a job
  async updateJob(id: string, updateJobInput: UpdateJobInput): Promise<Job> {
    try {
      const job = await this.findOne(id);
      
      Object.assign(job, updateJobInput);
      return this.jobRepository.save(job);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update job status
  async updateStatus(id: string, status: string): Promise<Job> {
    const job = await this.findOne(id);
    job.status = status as any;
    return this.jobRepository.save(job);
  }

  // Delete a job
  async deleteJob(id: string): Promise<boolean> {
    try {
      const job = await this.findOne(id);
      await this.jobRepository.remove(job);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
