import { ApiProperty } from '@nestjs/swagger';

export class SignInType{
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String, minLength: 10 })
  password: string;
}
