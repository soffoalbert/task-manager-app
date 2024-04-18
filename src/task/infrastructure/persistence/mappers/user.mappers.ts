import { UserModel } from '@src/task/domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(userEntity: UserEntity): UserModel {
    const taskModel = new UserModel({
      ...userEntity,
    });
    return taskModel;
  }

  static toPersistence(user: UserModel): UserEntity {
    return new UserEntity({
      ...user,
    });
  }
}
