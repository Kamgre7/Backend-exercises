import { User } from '../../../be-fundamentals/OOP/library-hard/User';
import { UserHandler } from '../../../be-fundamentals/OOP/library-hard/UserHandler';
import { UserInformation } from '../../../be-fundamentals/OOP/library-hard/UserList';

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

describe('UserHandler', () => {
  it('Should be a instance of UserHandler', () => {
    expect(userHandler).toBeInstanceOf(UserHandler);
  });

  it('Should update user email', () => {
    userHandler.updateEmail(john, 'chris@example.com');

    expect(john.email).toBe('chris@example.com');
  });

  it('Should reactive soft deleted user', () => {
    john.deletedAt = new Date();
    john.updatedAt = new Date();

    expect(john.deletedAt).not.toBeNull();

    userHandler.reactiveDeletedUser(john);

    expect(john.deletedAt).toBeNull();
  });

  it('Should block user', () => {
    expect(kate.blockedAt).toBeUndefined();

    userHandler.blockUser(kate);

    expect(kate.blockedAt).toBeDefined();
  });

  it('Should activate blocked user', () => {
    expect(blockedUserInformation.penaltyPoints).toEqual(10);

    userHandler.activateUser(blockedUserInformation);

    expect(blockedUserInformation.penaltyPoints).toEqual(0);
    expect(blockedUserInformation.user.blockedAt).toBeNull();
  });

  it('Should add 5 penalty points to user - 7 days allowed to return book, in test passed 12 days ', () => {
    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() - 12);

    userHandler.calculatePenaltyPoints(kateInformation, bookingDate);

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
  });
});
