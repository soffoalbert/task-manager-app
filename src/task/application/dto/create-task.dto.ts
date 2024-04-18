import { IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;

  constructor(init?: Partial<CreateTaskDTO>) {
    Object.assign(this, init);
  }
}
