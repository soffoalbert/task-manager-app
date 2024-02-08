import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task as TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../../../../../src/task/application/ports/task.repository';
import { Task as TaskModel } from '../../../../../src/task/domain/task';
import { TaskMapper } from '../mappers/task.mappers';
import { TaskStatus } from '@src/task/domain/value-objects/task-status';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async preload(id: number, status: TaskStatus): Promise<TaskModel> {
    return TaskMapper.toDomain(await this.taskRepository.preload({id, status: status.value}));
  }
  delete(id: number): Promise<TaskModel> {
    throw new Error('Method not implemented.');
  } 
  update(alarm: TaskModel): Promise<TaskModel> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<TaskModel[]> {
    const entities = await this.taskRepository.find();
    return entities.map((item) => TaskMapper.toDomain(item));
  }

  async save(taskModel: TaskModel): Promise<TaskModel> {
    const persistenceModel = TaskMapper.toPersistence(taskModel);
    const newEntity = await this.taskRepository.save(persistenceModel);
    return TaskMapper.toDomain(newEntity);
  }
}
