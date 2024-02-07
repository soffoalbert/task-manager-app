import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enumName: 'status',
    enum: TaskStatus,
  })
  status: TaskStatus

  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }
}
