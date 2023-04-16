import { User } from '../../../../be-fundamentals/OOP/library-hard/User/User';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('user@email.com');
  });

  it('Should be an instance of User class', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('Should change user email address', () => {
    user.setEmail('newEmail@example.com');

    expect(user.email).toBe('newEmail@example.com');
  });

  it('Should have default value of deletedAt - null', () => {
    expect(user.deletedAt).toBeNull();
  });

  it('Should have default value of blockedAt - null', () => {
    expect(user.blockedAt).toBeNull();
  });

  describe('Should throw an error when', () => {
    it('Should throw error when creating user with  empty email', () => {
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

    it('Should throw error when updating email with only whitespace string', () => {
      expect(() => {
        new User('                 ');
      }).toThrow();
    });

    it('Should throw error when updating email is empty string', () => {
      expect(() => {
        new User('user.com');
      }).toThrow();
    });

    it('Should throw error when updating email without @', () => {
      expect(() => {
        new User('user.com');
      }).toThrow();
    });
  });
});
