import { DynamicModule, Module, Type } from '@nestjs/common';
import { TaskFactory } from '../domain/factories/task-factory';
import { TaskService } from './task-service';
import { TaskPersistenceModule } from '../infrastructure/persistence/persistence.module';
import { TaskController } from './task-controller';
import { IAMModule } from './iam/iam.module';

@Module({
  imports: [TaskPersistenceModule ,IAMModule],
  providers: [
    TaskService,
    TaskFactory,
  ],
  controllers: [TaskController]
})
export class TasksModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: TasksModule,
      imports: [infrastructureModule],
    };
  }
}
