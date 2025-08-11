import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // TODO: Implement real Firebase Admin SDK verification
    // TODO: Extract user roles and permissions
    // For now, accept any Bearer token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return true;
    }

    return false;
  }
}
