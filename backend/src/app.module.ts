import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service.js';
import { ConfigModuleCustom } from './config/config.module.js';
import { AnimalsModule } from './livestock/animals.module.js';
import { SyncModule } from './sync/sync.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { SubscriptionsModule } from './subscriptions/subscriptions.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { FinanceModule } from './finance/finance.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModuleCustom],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getDatabaseUrl(),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false, // Use migrations instead
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    ConfigModuleCustom,
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