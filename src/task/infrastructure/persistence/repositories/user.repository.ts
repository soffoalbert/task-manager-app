import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@src/task/application/ports/user.repository';
import { UserModel } from '@src/task/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mappers';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '@src/task/application/iam/hashing-service';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
  ) {}

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    return UserMapper.toDomain(user);
  }
  async save(user: UserModel): Promise<void> {
    try {
      const userEntity = UserMapper.toPersistence(user);
      userEntity.password = await this.hashingService.hash(user.password);

      await this.usersRepository.save(userEntity);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }
}
