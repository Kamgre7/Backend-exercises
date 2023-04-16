import { User } from '../../../../be-fundamentals/OOP/library-hard/User/User';
import { UserHandler } from '../../../../be-fundamentals/OOP/library-hard/User/UserHandler';
import { UserInformation } from '../../../../be-fundamentals/OOP/library-hard/User/UserList';

describe('UserHandler', () => {
  let userHandler: UserHandler;
  let john: User;
  let kate: User;
  let blockedUser: User;
  let kateInformation: UserInformation;
  let johnInformation: UserInformation;
  let blockedUserInformation: UserInformation;

  beforeAll(() => {
    userHandler = new UserHandler();
  });

  beforeEach(() => {
    kate = new User('kate@example.com');

    kateInformation = {
      user: kate,
      penaltyPoints: 0,
    };

    john = new User('john@example.com');

    johnInformation = {
      user: john,
      penaltyPoints: 0,
    };

    blockedUser = new User('blocked@example.com');

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

  it('Should add penalty points to user', () => {
    kateInformation.penaltyPoints = 0;

    const daysPassedAfterBooking = 12;
    const bookingDate = new Date();

    bookingDate.setDate(bookingDate.getDate() - daysPassedAfterBooking);

    const pointsToAdd = userHandler.calculatePenaltyPoints(bookingDate);
    const sumPoints = kateInformation.penaltyPoints + pointsToAdd;

    userHandler.setUserPenaltyPoints(kateInformation, pointsToAdd);

    expect(kateInformation.penaltyPoints).toEqual(sumPoints);
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
