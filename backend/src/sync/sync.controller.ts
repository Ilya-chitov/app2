import { Controller, Post, Get, Body } from '@nestjs/common';

interface SyncOperation {
  id: string;
  type: string;
  entity: string;
  data: any;
  tempId?: string;
}

interface QueueResponse {
  accepted: number;
  idMap: Record<string, string>;
}

interface ChangesResponse {
  changes: any[];
  cursor: string;
}

@Controller('sync')
export class SyncController {
  // TODO: Replace with persistent storage and proper conflict resolution
  private inMemoryQueue: SyncOperation[] = [];

  @Post('queue')
  async queueOperations(
    @Body('ops') operations: SyncOperation[],
  ): Promise<QueueResponse> {
    // TODO: Implement proper validation, authentication, and persistence
    const idMap: Record<string, string> = {};

    for (const op of operations) {
      // Generate server-side temporary ID mapping
      if (op.tempId) {
        idMap[op.tempId] = `srv-${op.tempId}`;
      }

      // Add to in-memory queue
      this.inMemoryQueue.push({
        ...op,
        id: op.tempId ? `srv-${op.tempId}` : op.id,
      });
    }

    return {
      accepted: operations.length,
      idMap,
    };
  }

  @Get('changes')
  async getChanges(): Promise<ChangesResponse> {
    // TODO: Implement proper change detection and cursor-based pagination
    return {
      changes: [],
      cursor: new Date().toISOString(),
    };
  }
}
