import {
  IUser,
  User,
} from '../../../../be-fundamentals/OOP/library-hard/User/User';
import {
  IUserHandler,
  UserHandler,
} from '../../../../be-fundamentals/OOP/library-hard/User/UserHandler';
import { UserInformation } from '../../../../be-fundamentals/OOP/library-hard/User/UserList';
import { ALLOWED_BOOKING_TIME } from '../../../../be-fundamentals/OOP/library-hard/utils/utils';
import {
  blockedUserEmail,
  johnUserEmail,
  kateUserEmail,
} from '../utils/constants';

describe('UserHandler', () => {
  let userHandler: IUserHandler;
  let john: IUser;
  let kate: IUser;
  let blockedUser: IUser;
  let kateInformation: UserInformation;
  let johnInformation: UserInformation;
  let blockedUserInformation: UserInformation;

  beforeAll(() => {
    userHandler = new UserHandler();
  });

  beforeEach(() => {
    kate = new User(kateUserEmail);

    kateInformation = {
      user: kate,
      penaltyPoints: 0,
    };

    john = new User(johnUserEmail);

    johnInformation = {
      user: john,
      penaltyPoints: 0,
    };

    blockedUser = new User(blockedUserEmail);
    blockedUser.blockedAt = new Date('10/10/2022');

    blockedUserInformation = {
      user: blockedUser,
      penaltyPoints: 10,
    };
  });

  it('Should be a instance of UserHandler', () => {
    expect(userHandler).toBeInstanceOf(UserHandler);
  });

  it('Should update user email', () => {
    userHandler.updateEmail(john, 'chris@example.com');

    expect(john.email).toBe('chris@example.com');
  });

  it('Should reactive soft deleted user', () => {
    john.deletedAt = new Date();
    userHandler.reactiveDeletedUser(john);

    expect(john.deletedAt).toBeNull();
  });

  it('Should block user', () => {
    expect(kate.blockedAt).toBeNull();

    userHandler.blockUser(kate);

    expect(kate.blockedAt).toBeInstanceOf(Date);
  });

  it('Should activate blocked user', () => {
    blockedUserInformation.penaltyPoints = 10;

    userHandler.activateUser(blockedUserInformation);

    expect(blockedUserInformation.penaltyPoints).toEqual(0);
    expect(blockedUserInformation.user.blockedAt).toBeNull();
  });

  it('Should calculate penalty points', () => {
    const daysPassedAfterBooking = 12;
    const bookingDate = new Date();

    bookingDate.setDate(bookingDate.getDate() - daysPassedAfterBooking);

    const penaltyPoints = userHandler.calculatePenaltyPoints(bookingDate);

    expect(penaltyPoints).toEqual(
      daysPassedAfterBooking - ALLOWED_BOOKING_TIME
    );
  });

  it('Should add penalty points to user', () => {
    kateInformation.penaltyPoints = 0;
    const penaltyPoints = 5;

    userHandler.setUserPenaltyPoints(kateInformation, penaltyPoints);

    expect(kateInformation.penaltyPoints).toEqual(5);
  });

  describe('It should throw error when', () => {
    it('Should throw error when trying activate not blocked user', () => {
      expect(() => {
        userHandler.activateUser(johnInformation);
      });
    });

    it('Should throw error when user is deleted', () => {
      johnInformation.user.deletedAt = new Date();

      expect(() => {
        userHandler.checkIfUserNotDeletedOrThrow(johnInformation);
      });
    });

    it('Should throw error when user is not blocked', () => {
      expect(() => {
        userHandler.checkIfUserBlockedOrThrow(john);
      });
    });

    it('Should throw error when user cannot be reactivated', () => {
      expect(() => {
        userHandler.checkIfUserCanBeReactivated(john);
      });
    });

    it('Should throw error when user cannot be unblocked', () => {
      const daysUserBlocked = 15;
      const timePeriodToUnblock = 30;

      expect(() => {
        userHandler.checkIfUserAllowedToUnblockOrThrow(
          daysUserBlocked,
          timePeriodToUnblock
        );
      }).toThrow();
    });
  });
});
