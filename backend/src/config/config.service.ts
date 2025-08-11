import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(key) || process.env[key];
  }

  getPort(): number {
    return parseInt(this.get('PORT') || '3000', 10);
  }

  getDatabaseConfig() {
    return {
      type: 'postgres' as const,
      host: this.get('DB_HOST') || 'localhost',
      port: parseInt(this.get('DB_PORT') || '5432', 10),
      username: this.get('DB_USERNAME') || 'postgres',
      password: this.get('DB_PASSWORD') || 'password',
      database: this.get('DB_NAME') || 'seap_db',
      synchronize: false, // Use migrations instead
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
      logging: this.get('NODE_ENV') === 'development',
    };
  }
}
