import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AnimalsModule } from './animals/animals.module';
import { SyncModule } from './sync/sync.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { InventoryModule } from './inventory/inventory.module';
import { FinanceModule } from './finance/finance.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule,
    AnimalsModule,
    SyncModule,
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    InventoryModule,
    FinanceModule,
    ReportsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
