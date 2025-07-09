import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    interface RequestWithUser extends Request {
      user?: { isAdmin?: boolean };
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user || !user.isAdmin) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true;
  }
}
