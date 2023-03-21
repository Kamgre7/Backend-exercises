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
  setUserEmail(userId: string, newEmail: string): void;
  blockUser(userId: string): void;
  activateUser(userId: string): void;
  findUser(userId: string): UserInformation;
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
    const user = new User(email);

    this.users.set(user.id, {
      user,
      penaltyPoints: 0,
      isActive: true,
    });

    return user.id;
  }

  setUserEmail(userId: string, newEmail: string): void {
    const user = this.findUser(userId);

    user.user.setEmail(newEmail);
  }

  blockUser(userId: string): void {
    const user = this.findUser(userId);

    user.isActive = false;
    user.user.blockedAt = new Date();
  }

  activateUser(userId: string): void {
    const user = this.findUser(userId);

    user.isActive = true;
    user.penaltyPoints = 0;
    user.user.blockedAt = null;
  }

  findUser(userId: string): UserInformation {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }
}
