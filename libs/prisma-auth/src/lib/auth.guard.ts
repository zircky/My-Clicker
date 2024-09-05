import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_ROUTE_KEY } from '../decorators/public-route.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private jwtService: JwtService) {
  }

  async canActivate(context:ExecutionContext):Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass,
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
  }
}
