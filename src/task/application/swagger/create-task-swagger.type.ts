import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskType {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  constructor(init?: Partial<CreateTaskType>) {
    Object.assign(this, init);
  }
}
