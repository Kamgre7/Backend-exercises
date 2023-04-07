import { DataValidator } from './DataValidator';
import { IUser } from './User';
import { UserInformation } from './UserList';
import {
  ALLOWED_BOOKING_TIME,
  TIME_PERIOD_TO_UNBLOCK,
  countDays,
  currentDate,
} from './utils';

export interface IUserHandler {
  updateEmail(user: IUser, newEmail: string): void;
  reactiveDeletedUser(user: IUser): void;
  blockUser(user: IUser): void;
  setUserPenaltyPoints(
    serInformation: UserInformation,
    pointsToAdd: number
  ): void;
  activateUser(userInformation: UserInformation): void;
  calculatePenaltyPoints(user: UserInformation, daysPassed: number): void;
  checkIfUserNotDeletedOrThrow(userInformation: UserInformation): void;
  checkIfBlockUser(userInformation: UserInformation): void;
  checkIfUserNotBlockedOrThrow(user: IUser): void;
  checkIfUserBlockedOrThrow(user: IUser): void;
  checkIfUserCanBeReactivated(user: IUser): void;
  checkIfUserAllowedToUnblocKOrThrow(
    daysUserBlocked: number,
    timePeriodToUnblock: number
  ): void;
}

export class UserHandler implements IUserHandler {
  updateEmail(user: IUser, newEmail: string): void {
    user.setEmail(newEmail);
  }

  reactiveDeletedUser(user: IUser): void {
    user.deletedAt = null;
    user.updatedAt = new Date();
  }

  blockUser(user: IUser): void {
    this.checkIfUserNotBlockedOrThrow(user);

    user.blockedAt = new Date();
    user.updatedAt = new Date();
  }

  activateUser(userInformation: UserInformation): void {
    this.checkIfUserBlockedOrThrow(userInformation.user);

    const daysUserBlocked = countDays(
      userInformation.user.blockedAt,
      currentDate()
    );

    this.checkIfUserAllowedToUnblocKOrThrow(
      daysUserBlocked,
      TIME_PERIOD_TO_UNBLOCK
    );

    userInformation.penaltyPoints = 0;
    userInformation.user.blockedAt = null;
  }

  calculatePenaltyPoints(user: UserInformation, daysPassed: number): void {
    if (daysPassed > ALLOWED_BOOKING_TIME) {
      const penaltyPointsToAdd = daysPassed - ALLOWED_BOOKING_TIME;

      this.setUserPenaltyPoints(user, penaltyPointsToAdd);
    }
  }

  setUserPenaltyPoints(
    userInformation: UserInformation,
    pointsToAdd: number
  ): void {
    DataValidator.checkIfNotEqualOrBelowZero(pointsToAdd);

    userInformation.penaltyPoints += pointsToAdd;
  }

  checkIfUserNotDeletedOrThrow(userInformation: UserInformation): void {
    if (userInformation.user.deletedAt) {
      throw new Error('User is deleted');
    }
  }

  checkIfBlockUser(userInformation: UserInformation): void {
    if (userInformation.penaltyPoints >= 10) {
      this.blockUser(userInformation.user);
    }
  }

  checkIfUserNotBlockedOrThrow(user: IUser): void {
    if (user.blockedAt) {
      throw new Error('User already blocked');
    }
  }

  checkIfUserBlockedOrThrow(user: IUser): void {
    if (!user.blockedAt) {
      throw new Error('User is not blocked');
    }
  }

  checkIfUserCanBeReactivated(user: IUser): void {
    if (!user.deletedAt) {
      throw new Error(
        'User cannot be activated because account is not deleted'
      );
    }
  }

  checkIfUserAllowedToUnblocKOrThrow(
    daysUserBlocked: number,
    timePeriodToUnblock: number
  ): void {
    if (daysUserBlocked < timePeriodToUnblock) {
      throw new Error(
        `User cannot be activated. To activate ${
          TIME_PERIOD_TO_UNBLOCK - daysUserBlocked
        } days left`
      );
    }
  }
}
