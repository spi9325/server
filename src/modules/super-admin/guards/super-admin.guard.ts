import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request['SuperAdmin'] = payload;

      response.cookie('token', token, {
        httpOnly: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
      });

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}



// for specfic token
//     const token =
      // this.extractFromHeader(request) ||
      // this.extractFromCookie(request);