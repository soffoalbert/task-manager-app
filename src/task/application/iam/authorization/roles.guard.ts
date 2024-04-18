import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { Role } from '@src/task/infrastructure/persistence/entities/role.enum';
import { REQUEST_USER_KEY } from '../guards/iam.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(contextRoles);
    if (!contextRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    console.log(user);
    return contextRoles.some((role) => user.role === role);
  }
}
