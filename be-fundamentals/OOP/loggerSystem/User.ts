import { v4 as uuid } from 'uuid';
import { emailRegex } from './utils';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  BASIC = 'basic',
}
interface IUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export class User implements IUser {
  email: string;
  role = UserRole.BASIC;
  createdAt = new Date();

  constructor(email: string, public readonly id = uuid()) {
    this.validateMail(email);
    this.email = email;
  }

  private validateMail(email: string): void {
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  }
}
