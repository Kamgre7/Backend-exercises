import {
  IUser,
  User,
} from '../../../../be-fundamentals/OOP/library-hard/User/User';
import {
  IUserList,
  UserInformation,
  UserList,
} from '../../../../be-fundamentals/OOP/library-hard/User/UserList';
import { johnUserEmail, kateUserEmail } from '../utils/constants';

describe('UserList', () => {
  let userList: IUserList;
  let users: Map<string, UserInformation>;
  let john: IUser;
  let kate: IUser;
  let kateInformation: UserInformation;
  let johnInformation: UserInformation;

  beforeAll(() => {
    userList = UserList.getInstance(users);
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

    users = new Map([
      [kate.id, kateInformation],
      [john.id, johnInformation],
    ]);

    userList.users = users;
  });

  it('Should be instance of UserList', () => {
    expect(userList).toBeInstanceOf(UserList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondUserList = UserList.getInstance();

    expect(userList).toStrictEqual(secondUserList);
  });

  it('Should add a new user', () => {
    const user = new User('user@example.com');

    userList.addUser(user);

    expect(userList.users.has(user.id)).toBeTruthy();
  });

  it('Should soft delete a user', () => {
    expect(kate.deletedAt).toBeNull();

    userList.deleteUser(kate.id);

    expect(kate.deletedAt).toBeInstanceOf(Date);
  });

  it('Should find a user using email', () => {
    const userInformation = userList.findUserByEmail(john.email);

    expect(userInformation).toBe(johnInformation);
  });

  describe('Should throw error when', () => {
    it('Should throw error when user is not found', () => {
      expect(() => {
        userList.findUserByIdOrThrow('12345');
      }).toThrow();
    });

    it('Should throw error when try to delete deleted user', () => {
      userList.deleteUser(john.id);

      expect(() => {
        userList.deleteUser(john.id);
      }).toThrow();
    });

    it('Should throw error when email is already taken', () => {
      expect(() => {
        userList.checkIfEmailAvailableOrThrow(kate.email);
      });
    });
  });
});
