import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from './hashing-service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserRepository } from '../ports/user.repository';
import { UserModel } from '@src/task/domain/user';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './jwt.config';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { ActiveUserData } from './active-user-data.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return this.userRepo.save(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepo.findByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return {
      accessToken,
    };
  }

  toModel(signUpDto: SignUpDto): UserModel {
    return {
      email: signUpDto.email,
      password: signUpDto.password,
    };
  }
}
