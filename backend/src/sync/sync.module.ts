import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller.js';

@Module({
  controllers: [SyncController],
  // TODO: Add sync service for complex sync logic
  // TODO: Add sync queue management
})
export class SyncModule {}