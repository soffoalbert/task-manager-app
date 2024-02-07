import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async add(
    title: string,
    description: string,
    status: TaskStatus,
  ): Promise<Task> {
    try {
      const tmpTask = this.taskRepo.create({ title, description, status });
      return await this.taskRepo.save(tmpTask);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async removeTask(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }

  isTaskStatus(value: any): value is TaskStatus {
    return Object.values(TaskStatus).includes(value);
  }

  async editTask(
    id: number,
    newTitle: string,
    newDescription: string,
    status: TaskStatus,
  ): Promise<Task> {
    const newTask: Task = new Task();

    if (!this.isTaskStatus(status)) {
      throw new Error('The Task status must be a valid TaskStatus value.');
    }

    newTask.title = newTitle;
    newTask.description = newDescription;
    newTask.status = status;
    try {
      const task = await this.taskRepo.preload({
        id,
        ...newTask,
      });
      if (!task) {
        throw new Error(`task #${id} does not exist`);
      }
      return this.taskRepo.save(task);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }
}
