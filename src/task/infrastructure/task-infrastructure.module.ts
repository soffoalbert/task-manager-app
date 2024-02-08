import { Module } from '@nestjs/common';
import { TaskPersistenceModule } from './persistence/persistence.module';

@Module({})
export class TaskInfrastructureModule {
  static use(driver: 'orm' | 'file') {
    const persistenceModule = TaskPersistenceModule;
    return {
      module: TaskInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
