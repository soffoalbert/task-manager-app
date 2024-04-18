import { Role } from "../infrastructure/persistence/entities/role.enum";

export class UserModel {
  id?: number;
  email: string;
  password: string;
  role?: Role

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
