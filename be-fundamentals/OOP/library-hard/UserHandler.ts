import { IUser } from './User';
import { UserInformation } from './UserList';
import { TIME_PERIOD_TO_UNBLOCK, countDays, currentDate } from './utils';

export interface IUserHandler {
  updateEmail(user: IUser, newEmail: string): void;
  reactiveDeletedUser(user: IUser): void;
  blockUser(user: IUser): void;
  activateUser(userInformation: UserInformation): void;
  checkIfBlocked(user: IUser): boolean;
  checkIfActiveOrThrow(user: IUser): void;
  checkIfUserDeletedOrThrow(user: IUser): void;
}

export class UserHandler implements IUserHandler {
  updateEmail(user: IUser, newEmail: string): void {
    this.checkIfActiveOrThrow(user);

    user.setEmail(newEmail);
  }

  reactiveDeletedUser(user: IUser): void {
    this.checkIfUserDeletedOrThrow(user);

    user.deletedAt = null;
    user.updatedAt = new Date();
  }

  blockUser(user: IUser): void {
    if (this.checkIfBlocked(user)) {
      return;
    }

    user.blockedAt = new Date();
    user.updatedAt = new Date();
  }

  activateUser(userInformation: UserInformation): void {
    if (!this.checkIfBlocked(userInformation.user)) {
      return;
    }

    const daysUserBlocked = countDays(
      userInformation.user.blockedAt,
      currentDate()
    );

    if (daysUserBlocked <= TIME_PERIOD_TO_UNBLOCK) {
      throw new Error(
        `User cannot be activated. To activate ${
          TIME_PERIOD_TO_UNBLOCK - daysUserBlocked
        } days left`
      );
    }

    userInformation.penaltyPoints = 0;
    userInformation.user.blockedAt = null;
  }

  checkIfBlocked(user: IUser): boolean {
    return user.blockedAt ? true : false;
  }

  checkIfUserDeletedOrThrow(user: IUser): void {
    if (!user.deletedAt) {
      throw new Error('This email address is already used');
    }
  }

  checkIfActiveOrThrow(user: IUser): void {
    if (user.deletedAt) {
      throw new Error('Cannot update deleted account');
    }
  }
}
