import { Module } from '@nestjs/common';
import { ConfigModuleCustom } from '../config/config.module.js';
import { FirebaseAuthGuard } from './firebase-auth.guard.js';

@Module({
  imports: [ConfigModuleCustom],
  providers: [FirebaseAuthGuard],
  exports: [FirebaseAuthGuard],
})
export class AuthModule {
  // TODO: Add Firebase Admin SDK initialization
  // TODO: Add user management services
  // TODO: Add role-based access control
}