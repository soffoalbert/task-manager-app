import { Module } from '@nestjs/common';
import { HashingService } from './hashing-service';
import { BcryptService } from './bcrypt-service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TaskPersistenceModule } from '@src/task/infrastructure/persistence/persistence.module';
import { AuthenticationGuard } from './authentication.guard';
import { RolesGuard } from './authorization/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    TaskPersistenceModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthenticationService,
    AccessTokenGuard,
  ],
  controllers: [AuthenticationController],
})
export class IAMModule {}
