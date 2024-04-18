export class UserModel {
  id?: number;
  email: string;
  password: string;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
