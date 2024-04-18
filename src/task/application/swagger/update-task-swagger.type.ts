import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskType {
  @ApiProperty({ type: String, nullable: true })
  title?: string;

  @ApiProperty({ type: String, nullable: true })
  description?: string;

  constructor(init?: Partial<UpdateTaskType>) {
    Object.assign(this, init);
  }
}
