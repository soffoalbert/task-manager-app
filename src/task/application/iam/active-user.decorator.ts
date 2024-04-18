import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from './active-user-data.interface';
import { REQUEST_USER_KEY } from './guards/iam.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
