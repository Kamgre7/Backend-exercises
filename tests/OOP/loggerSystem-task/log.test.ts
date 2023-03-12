import { Log, LOG_TYPE } from '../../../be-fundamentals/OOP/loggerSystem/Log';
import {
  User,
  USER_ROLE,
} from '../../../be-fundamentals/OOP/loggerSystem/User';

let user: User;
let log: Log;

beforeEach(() => {
  user = new User('admin@example.com', USER_ROLE.ADMIN);

  log = new Log({
    content: 'User log',
    createdBy: user.id,
    permission: user.role,
    type: LOG_TYPE.ERROR,
  });
});

describe('Log', () => {
  it('Should be an instance of Log class', () => {
    expect(log).toBeInstanceOf(Log);
  });

  it('Should be error type', () => {
    expect(log.type).toEqual(LOG_TYPE.ERROR);
  });

  it('Should have admin permission', () => {
    expect(log.permission).toEqual(user.role);
  });

  it('Should have default false value on isDeleted', () => {
    expect(log.isDeleted).toBeFalsy();
  });

  it('Should be created by user', () => {
    expect(log.createdBy).toBe(user.id);
  });

  it('Should change isDeleted value to true after deleting', () => {
    log.delete(user.id);

    expect(log.isDeleted).toBeTruthy();
  });

  it('Should have user id which deleted log on deletedBy value', () => {
    log.delete(user.id);

    expect(log.deletedBy).toEqual(user.id);
  });

  describe('Should throw error when', () => {
    it('Should throw error when creating log with no content', () => {
      expect(() => {
        new Log({
          content: '',
          createdBy: user.id,
          permission: user.role,
          type: LOG_TYPE.ERROR,
        });
      }).toThrow();
    });

    it('Should throw error when creating log with only whitespace', () => {
      expect(() => {
        new Log({
          content: '        ',
          createdBy: user.id,
          permission: user.role,
          type: LOG_TYPE.ERROR,
        });
      }).toThrow();
    });

    it('Should throw error when trying delete deleted log', () => {
      expect(() => {
        log.delete(user.id);
        log.delete(user.id);
      }).toThrow();
    });
  });
});
