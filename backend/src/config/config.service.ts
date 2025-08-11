import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getDatabaseUrl(): string {
    return process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/livestock_db';
  }

  getPort(): number {
    return parseInt(process.env.PORT, 10) || 3000;
  }

  getCorsOrigin(): string {
    return process.env.CORS_ORIGIN || 'http://localhost:5173';
  }

  getFirebaseConfig() {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };
  }
}