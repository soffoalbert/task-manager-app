import { TaskStatus } from '@src/task/domain/value-objects/task-status';
import { Task } from '../../domain/task';

export abstract class TaskRepository {
  abstract findAll(): Promise<Task[]>;
  abstract save(task: Task): Promise<Task>;
  abstract delete(id: number): Promise<void>;
  abstract preloadStatus(id: number, status: TaskStatus): Promise<Task>;
  abstract preload(id: number, task: Task): Promise<Task>;
  abstract query(query: string): Promise<void>;
}
