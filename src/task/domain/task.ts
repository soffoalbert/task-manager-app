import { TaskStatus } from './value-objects/task-status';

export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status?: TaskStatus,
  ) {}
}
