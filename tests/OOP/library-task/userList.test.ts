import { User } from '../../../be-fundamentals/OOP/library-hard/User';
import {
  UserList,
  UserInformation,
} from '../../../be-fundamentals/OOP/library-hard/UserList';

let userList: UserList;
let users: Map<string, UserInformation>;
let john: User;
let kate: User;
let kateInformation: UserInformation;
let johnInformation: UserInformation;

beforeAll(() => {
  userList = UserList.getInstance(users);
});

beforeEach(() => {
  kate = new User('kate@example.com');

  kateInformation = {
    user: kate,
    isActive: true,
    penaltyPoints: 0,
  };

  john = new User('john@example.com');

  johnInformation = {
    user: john,
    isActive: true,
    penaltyPoints: 0,
  };

  users = new Map([
    [kate.id, kateInformation],
    [john.id, johnInformation],
  ]);

  userList.users = users;
});

describe('UserList', () => {
  it('Should be instance of UserList', () => {
    expect(userList).toBeInstanceOf(UserList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondUserList = UserList.getInstance();

    expect(userList).toStrictEqual(secondUserList);
  });

  it('Should add a new user', () => {
    const newUserId = userList.addUser('user@example.com');

    expect(userList.users.has(newUserId)).toBeTruthy();
  });

  it('Should find a user using userId and return it', () => {
    const user = userList.findUserOrThrow(john.id);

    expect(user).toStrictEqual(johnInformation);
  });

  describe('Should throw error when', () => {
    it('Should throw error when creating user with  empty email', () => {
      expect(() => {
        userList.addUser('');
      }).toThrow();
    });

    it('Should throw error when email is only whitespace string', () => {
      expect(() => {
        userList.addUser('                 ');
      }).toThrow();
    });

    it('Should throw error when email not include @', () => {
      expect(() => {
        userList.addUser('user.com');
      }).toThrow();
    });

    it('Should throw error when user is not found', () => {
      expect(() => {
        userList.findUserOrThrow('12345');
      }).toThrow();
    });

    it('Should throw error when email address is already used and try to add again to DB', () => {
      userList.addUser('example@example.com');

      expect(() => {
        userList.addUser('example@example.com');
      }).toThrow();
    });
  });
});
