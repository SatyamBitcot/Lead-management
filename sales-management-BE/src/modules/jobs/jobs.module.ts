import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './jobs.service';
import { JobResolver } from './jobs.resolver';
import { Job } from '../../entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobService, JobResolver],
  exports: [JobService],
})
export class JobModule {}
