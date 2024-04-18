import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Auth } from './auth.decorator';
import { AuthType } from './auth-type.enum';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpType } from './swagger/signup.type';
import { SignInType } from './swagger/signin.type';

@Auth(AuthType.None)
@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: SignUpType })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'User authentication' })
  @ApiBody({ type: SignInType })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
