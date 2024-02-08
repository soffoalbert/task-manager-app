import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepositoryImpl } from './repositories/task.repository';
import { TaskRepository } from '../../../../src/task/application/ports/task.repository';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl, // 💡 This is where we bind the port to an adapter
    },
  ],
  exports: [TaskRepository],
})
export class TaskPersistenceModule {}