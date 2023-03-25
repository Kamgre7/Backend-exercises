import { userDB } from './libraryDB';
import { IUser, User } from './User';

export type UserInformation = {
  user: IUser;
  penaltyPoints: number;
  isActive: boolean;
};

export interface IUserList {
  users: Map<string, UserInformation>;
  addUser(email: string): void;
  findUserOrThrow(userId: string): UserInformation;
  checkIfEmailNotUsedOrThrow(email: string): void;
}

export class UserList implements IUserList {
  private static instance: UserList;

  private constructor(public users = userDB) {}

  static getInstance(users?: Map<string, UserInformation>): UserList {
    if (!UserList.instance) {
      UserList.instance = new UserList(users);
    }

    return UserList.instance;
  }

  addUser(email: string): string {
    this.checkIfEmailNotUsedOrThrow(email);

    const user = new User(email);

    this.users.set(user.id, {
      user,
      penaltyPoints: 0,
      isActive: true,
    });

    return user.id;
  }

  findUserOrThrow(userId: string): UserInformation {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }

  checkIfEmailNotUsedOrThrow(email: string): void {
    const usersDBEmail = [...this.users].map(([id, user]) => user.user.email);
    const isEmailInDB = usersDBEmail.some((userEmail) => userEmail === email);

    if (isEmailInDB) {
      throw new Error('Email already used');
    }
  }
}
