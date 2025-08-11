import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsService } from './animals.service.js';
import { AnimalsController } from './animals.controller.js';
import { Animal } from './animal.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule {}