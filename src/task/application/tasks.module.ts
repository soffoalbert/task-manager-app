import { DynamicModule, Module, Type } from '@nestjs/common';
import { TaskFactory } from '../domain/factories/task-factory';
import { TaskService } from './task-service';
import { TaskRepository } from './ports/task.repository';
import { TaskRepositoryImpl } from '../infrastructure/persistence/repositories/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../infrastructure/persistence/entities/task.entity';
import { TaskPersistenceModule } from '../infrastructure/persistence/persistence.module';

@Module({
  imports: [TaskPersistenceModule],
  providers: [
    TaskService,
    TaskFactory,
  ],
})
export class TasksModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: TasksModule,
      imports: [infrastructureModule],
    };
  }
}
