import {
  User,
  USER_ROLE,
} from '../../../be-fundamentals/OOP/loggerSystem/User';

const basicUser = new User('basic@user.com');

describe('User', () => {
  it('Should be an instance of User class', () => {
    expect(basicUser).toBeInstanceOf(User);
  });

  it('Should have a default role - basic', () => {
    expect(basicUser.role).toBe(USER_ROLE.BASIC);
  });

  it('Should create user with admin role', () => {
    const adminUser = new User('admin@user.com', USER_ROLE.ADMIN);

    expect(adminUser.role).toBe(USER_ROLE.ADMIN);
  });

  it('Should have the same email as when registering', () => {
    expect(basicUser.email).toEqual('basic@user.com');
  });

  describe('Should throw error when', () => {
    it('Should throw error when email is empty string', () => {
      expect(() => {
        new User('');
      }).toThrow();
    });

    it('Should throw error when email is only whitespace string', () => {
      expect(() => {
        new User('                 ');
      }).toThrow();
    });

    it('Should throw error when email not include @', () => {
      expect(() => {
        new User('user.com');
      }).toThrow();
    });
  });
});
