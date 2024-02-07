import { Logger, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { LoggerService } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), DatabaseModule],
  providers: [TaskService]
})
export class TaskModule {}
