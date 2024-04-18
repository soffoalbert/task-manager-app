import { UserModel } from "@src/task/domain/user";

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserModel | null>;
  abstract save(user: UserModel): Promise<void>;
}