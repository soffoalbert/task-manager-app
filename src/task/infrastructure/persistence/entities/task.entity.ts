import { TaskStatus } from "../../../../../src/task/domain/value-objects/task-status";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string

  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }
}
