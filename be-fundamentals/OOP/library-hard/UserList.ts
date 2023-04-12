import { userDB } from './libraryDB';
import { IUser, User } from './User';

export type UserInformation = {
  user: IUser;
  penaltyPoints: number;
};

export interface IUserList {
  users: Map<string, UserInformation>;
  addUser(email: string): string;
  deleteUser(userId: string): void;
  findUserOrThrow(userId: string): UserInformation;
  findUserIdByEmail(email: string): string;
  checkIfEmailAvailableOrThrow(email: string): void;
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
    this.checkIfEmailAvailableOrThrow(email);

    const user = new User(email);

    this.users.set(user.id, {
      user,
      penaltyPoints: 0,
    });

    return user.id;
  }

  deleteUser(userId: string): void {
    const { user } = this.findUserOrThrow(userId);

    if (user.deletedAt) {
      throw new Error('User already deleted');
    }

    user.deletedAt = new Date();
    user.updatedAt = new Date();
  }

  findUserOrThrow(userId: string): UserInformation {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }

  findUserIdByEmail(email: string): string {
    const user = [...this.users].find(
      ([userId, userInformation]) => userInformation.user.email === email
    );

    return user ? user[0] : null;
  }

  checkIfEmailAvailableOrThrow(email: string): void {
    if (this.findUserIdByEmail(email)) {
      throw new Error('The email address already taken');
    }
  }
}
