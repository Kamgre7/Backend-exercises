import { userDB } from '../utils/libraryDB';
import { IUser, User } from './User';

export type UserInformation = {
  user: IUser;
  penaltyPoints: number;
};

export interface IUserList {
  users: Map<string, UserInformation>;
  addUser(email: string): string;
  deleteUser(userId: string): void;
  findUserByIdOrThrow(userId: string): UserInformation;
  findUserByEmail(email: string): UserInformation | null;
  checkIfEmailAvailableOrThrow(email: string): void;
}

export class UserList implements IUserList {
  private static instance: UserList;

  private constructor(public users: Map<string, UserInformation>) {}

  static getInstance(users: Map<string, UserInformation> = userDB): UserList {
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
    const { user } = this.findUserByIdOrThrow(userId);

    user.deletedAt = new Date();
    user.updatedAt = new Date();
  }

  findUserByIdOrThrow(userId: string): UserInformation {
    const userInformation = this.users.get(userId);

    if (userInformation === undefined || userInformation.user.deletedAt) {
      throw new Error('User not found');
    }

    return userInformation;
  }

  findUserByEmail(email: string): UserInformation | null {
    const user = [...this.users].find(
      ([userId, userInformation]) => userInformation.user.email === email
    );

    return user ? user[1] : null;
  }

  checkIfEmailAvailableOrThrow(email: string): void {
    if (this.findUserByEmail(email)) {
      throw new Error('The email address already taken');
    }
  }
}
