import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialService } from './materials.service';
import { MaterialResolver } from './materials.resolver';
import { Material } from '../../entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialService, MaterialResolver],
  exports: [MaterialService],
})
export class MaterialModule {}
