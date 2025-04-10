import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './events.service';
import { EventResolver } from './events.resolver';
import { Event } from '../../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
