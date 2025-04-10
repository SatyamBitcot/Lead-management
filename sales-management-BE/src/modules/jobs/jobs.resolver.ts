import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobService } from './jobs.service';
import { Job } from '../../entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job])
  async getAllJobs(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Query(() => [Job])
  async getJobsByStatus(@Args('status') status: string): Promise<Job[]> {
    return this.jobService.findByStatus(status);
  }

  @Query(() => [Job])
  async getJobsByCustomer(@Args('customerId') customerId: string): Promise<Job[]> {
    return this.jobService.findByCustomer(customerId);
  }

  @Query(() => [Job])
  async getUpcomingJobs(@Args('days', { type: () => Int }) days: number): Promise<Job[]> {
    return this.jobService.findUpcoming(days);
  }

  @Query(() => Job)
  async getJob(@Args('id') id: string): Promise<Job> {
    return this.jobService.findOne(id);
  }

  @Mutation(() => Job)
  async createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
  ): Promise<Job> {
    return this.jobService.createJob(createJobInput);
  }

  @Mutation(() => Job)
  async updateJob(
    @Args('id') id: string,
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
  ): Promise<Job> {
    return this.jobService.updateJob(id, updateJobInput);
  }

  @Mutation(() => Job)
  async updateJobStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ): Promise<Job> {
    return this.jobService.updateStatus(id, status);
  }

  @Mutation(() => Boolean)
  async deleteJob(@Args('id') id: string): Promise<boolean> {
    return this.jobService.deleteJob(id);
  }
}
