import { userDB } from './libraryDB';
import { IUser, User } from './User';

export type UserInformation = {
  user: IUser;
  penaltyPoints: number;
  isActive: boolean;
};

export interface IUserList {
  users: Map<string, UserInformation>;
  addUser(email: string): string;
  createNewUser(email: string): string;
  reactiveUser(userId: string): void;
  deleteUser(userId: string): void;
  checkIfActive(userId: string): boolean;
  findUserOrThrow(userId: string): UserInformation;
  checkIfEmailUsed(email: string): boolean;
  checkIfUserDeleted(userId: string): boolean;
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
    return this.checkIfEmailUsed(email)
      ? this.reactiveUser(email)
      : this.createNewUser(email);
  }

  createNewUser(email: string): string {
    const user = new User(email);

    this.users.set(user.id, {
      user,
      penaltyPoints: 0,
      isActive: true,
    });

    return user.id;
  }

  reactiveUser(email: string): string {
    const userId = this.findUserIdByEmail(email);
    const { user } = this.findUserOrThrow(userId);

    user.deletedAt = null;
    user.updatedAt = new Date();

    return user.id;
  }

  deleteUser(userId: string): void {
    const { user } = this.findUserOrThrow(userId);

    if (this.checkIfActive(userId)) {
      user.deletedAt = new Date();
    }

    throw new Error('User already deleted');
  }

  findUserOrThrow(userId: string): UserInformation {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }

  checkIfEmailUsed(email: string): boolean {
    return [...this.users].some(
      ([id, userInformation]) => userInformation.user.email === email
    );
  }

  checkIfActive(userId: string): boolean {
    const { user } = this.findUserOrThrow(userId);

    return user.deletedAt === null;
  }

  checkIfUserDeleted(userId: string): boolean {
    const { user } = this.findUserOrThrow(userId);

    return user.deletedAt !== null;
  }

  private findUserIdByEmail(email: string): string {
    const [userId] = [...this.users].find(
      ([userId, userInformation]) => userInformation.user.email === email
    );

    return userId;
  }
}
