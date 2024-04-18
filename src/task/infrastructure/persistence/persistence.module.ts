import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepositoryImpl } from './repositories/task.repository';
import { Task } from './entities/task.entity';
import { TaskRepository } from '../../application/ports/task.repository';
import { UserRepository } from '../../application/ports/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { HashingService } from '../../application/iam/hashing-service';
import { BcryptService } from '../../application/iam/bcrypt-service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, UserEntity])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl, // Here is where we bind the port to an adapter
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl, // Here is where we bind the port to an adapter
    },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [TaskRepository, UserRepository],
})
export class TaskPersistenceModule {}
