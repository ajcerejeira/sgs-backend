import { User } from '../user.entity';

export class UserDetailDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
