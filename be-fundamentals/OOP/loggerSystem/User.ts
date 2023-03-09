import { v4 as uuid } from 'uuid';
import { emailRegex } from './utils';

export enum USER_ROLE {
  OWNER = 'owner',
  ADMIN = 'admin',
  BASIC = 'basic',
}

interface IUser {
  id: string;
  email: string;
  role: USER_ROLE;
  createdAt: Date;
}

export class User implements IUser {
  email: string;
  createdAt = new Date();

  constructor(
    email: string,
    public readonly role = USER_ROLE.BASIC,
    public readonly id = uuid()
  ) {
    this.validateMail(email);
    this.email = email;
  }

  private validateMail(email: string): void {
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  }
}
