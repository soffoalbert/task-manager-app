import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { TasksModule } from './task/application/tasks.module';
import { TaskInfrastructureModule } from './task/infrastructure/task-infrastructure.module';
import { CoreModule } from '../src/core/core.module';

@Module({
  imports: [
    CoreModule,
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      load: [] ,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        TasksModule.withInfrastucture(
          TaskInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
