import { v4 as uuid } from 'uuid';
import { emailRegex } from './utils';

export interface IUser {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  blockedAt: Date;
  setEmail(newEmail: string): void;
}

export class User implements IUser {
  email: string;
  readonly createdAt: Date = new Date();
  updatedAt: Date;
  deletedAt: Date;
  blockedAt: Date;

  constructor(email: string, public readonly id = uuid()) {
    this.validateMail(email);
    this.email = email;
  }

  setEmail(newEmail: string): void {
    this.validateMail(newEmail);

    this.email = newEmail;
    this.updatedAt = new Date();
  }

  private validateMail(email: string): void {
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  }
}
