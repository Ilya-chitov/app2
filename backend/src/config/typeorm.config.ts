import { DataSource } from 'typeorm';
import { Animal } from '../animals/entities/animal.entity';

export const typeOrmConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'seap_db',
  entities: [Animal],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false, // Never use synchronize in production
  logging: process.env.NODE_ENV === 'development',
};

// For TypeORM CLI
export default new DataSource({
  ...typeOrmConfig,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
