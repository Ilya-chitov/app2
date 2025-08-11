import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '../config/config.service.js';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      // TODO: Implement Firebase Admin SDK token verification
      // const decodedToken = await admin.auth().verifyIdToken(token);
      // request.user = decodedToken;
      
      // For now, just validate token format
      if (!token.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid token format');
      }
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}