import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepositoryImpl } from './repositories/task.repository';
import { Task } from './entities/task.entity';
import { TaskRepository } from '../../../../src/task/application/ports/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
  ],
  exports: [TaskRepository],
})
export class TaskPersistenceModule {}