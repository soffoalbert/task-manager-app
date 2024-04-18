import { ApiProperty } from '@nestjs/swagger';

export class SignUpType {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String, minLength: 10 })
  password: string;
}
