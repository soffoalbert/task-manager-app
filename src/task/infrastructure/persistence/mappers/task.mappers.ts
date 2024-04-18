import { Task } from '@src/task/domain/task';
import { Task as TaskEntity } from '../entities/task.entity';
import { TaskStatus } from '@src/task/domain/value-objects/task-status';

export class TaskMapper {
  static toDomain(taskEntity: TaskEntity): Task {
    const status = new TaskStatus(
        taskEntity.status as "complete" | "not_complete",
    );
    const taskModel = new Task(
      taskEntity.id,
      taskEntity.title,
      taskEntity.description,
      status,
    );
    return taskModel;
  }

  static toPersistence(task: Task): TaskEntity {
    const entity = new TaskEntity();
    entity.id = task.id;
    entity.title = task.title;
    entity.description = task.description;
    entity.status = task.status.value;
    return entity;
  }
}