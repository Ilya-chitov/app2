import { store } from '../store';
import {
  addPendingOperation,
  removePendingOperation,
  setSyncing,
  setLastSyncTime,
  addSyncError,
} from '../store/slices/syncSlice';

export interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  data: any;
  tempId?: string;
  timestamp: number;
}

class OfflineQueueService {
  private syncInProgress = false;

  constructor() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
    
    // Initialize sync when service is created
    if (navigator.onLine) {
      this.syncPendingOperations();
    }
  }

  queueOperation(operation: Omit<SyncOperation, 'id' | 'timestamp'>) {
    const fullOperation: SyncOperation = {
      ...operation,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    store.dispatch(addPendingOperation(fullOperation));

    // Try to sync immediately if online
    if (navigator.onLine && !this.syncInProgress) {
      this.syncPendingOperations();
    }

    return fullOperation;
  }

  private handleOnline() {
    console.log('App is online, syncing pending operations...');
    this.syncPendingOperations();
  }

  private handleOffline() {
    console.log('App is offline, operations will be queued for later sync');
  }

  async syncPendingOperations() {
    if (this.syncInProgress) return;

    const state = store.getState();
    const pendingOps = state.sync.pendingOperations;

    if (pendingOps.length === 0) return;

    this.syncInProgress = true;
    store.dispatch(setSyncing(true));

    try {
      const response = await fetch('/api/sync/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operations: pendingOps,
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Remove synced operations from queue
      pendingOps.forEach(op => {
        store.dispatch(removePendingOperation(op.id));
      });

      // Update last sync time
      store.dispatch(setLastSyncTime(Date.now()));

      console.log(`Synced ${result.accepted} operations successfully`);
      
      // TODO: Handle ID mapping for temp IDs
      // TODO: Dispatch actions to update store with real IDs

    } catch (error) {
      console.error('Sync failed:', error);
      store.dispatch(addSyncError(error instanceof Error ? error.message : 'Sync failed'));
    } finally {
      this.syncInProgress = false;
      store.dispatch(setSyncing(false));
    }
  }

  // TODO: Add retry logic for failed operations
  // TODO: Add conflict resolution
  // TODO: Add progress tracking for large sync operations
}

export const offlineQueue = new OfflineQueueService();