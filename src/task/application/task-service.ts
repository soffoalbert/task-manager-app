import { Injectable } from '@nestjs/common';
import { TaskFactory } from '../domain/factories/task-factory';
import { TaskRepository } from './ports/task.repository';
import { Task } from '../domain/task';
import { TaskStatus } from '../domain/value-objects/task-status';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly taskFactory: TaskFactory,
  ) {}

  async add(title: string, description: string): Promise<Task> {
    try {
      const tmpTask = this.taskFactory.create(
        title,
        description,
        new TaskStatus('not_complete').value,
      );
      return await this.taskRepo.save(tmpTask);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.findAll();
  }

  async query(query: string): Promise<void> {
    this.taskRepo.query(query);
  }

  async removeTask(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }

  async updateTask(inputTask: Task, id: number) {
    console.log(inputTask);

    try {
      const task = await this.taskRepo.preload(+id, inputTask);
      console.log(task);
      if (!task) {
        throw new Error(`task #${id} does not exist`);
      }
      return this.taskRepo.save(task);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async complete(id: number): Promise<Task> {
    try {
      const task = await this.taskRepo.preloadStatus(
        id,
        new TaskStatus('complete'),
      );
      console.log(task);
      if (!task) {
        throw new Error(`task #${id} does not exist`);
      }
      return this.taskRepo.save(task);
    } catch (error) {
      console.error('Error completing the task:', error);
      throw error;
    }
  }
}
