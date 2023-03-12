import {
  ILog,
  Log,
  LOG_TYPE,
} from '../../../be-fundamentals/OOP/loggerSystem/Log';
import { Logger } from '../../../be-fundamentals/OOP/loggerSystem/Logger';
import {
  IUser,
  User,
  USER_ROLE,
} from '../../../be-fundamentals/OOP/loggerSystem/User';

let logger: Logger;
let basicUser: User;
let adminUser: User;
let ownerUser: User;
let basicLog: Log;
let adminLog: Log;
let ownerLog: Log;
let logList: Map<string, ILog>;
let userList: Map<string, IUser>;

beforeAll(() => {
  logger = Logger.getInstance(logList, userList);
});

beforeEach(() => {
  basicUser = new User('basic@user.com');
  adminUser = new User('admin@user.com', USER_ROLE.ADMIN);
  ownerUser = new User('owner@user.com', USER_ROLE.OWNER);

  basicLog = new Log({
    content: 'Error log',
    createdBy: basicUser.id,
    permission: basicUser.role,
    type: LOG_TYPE.ERROR,
  });

  adminLog = new Log({
    content: 'Warning log',
    createdBy: adminUser.id,
    permission: adminUser.role,
    type: LOG_TYPE.WARNING,
  });

  ownerLog = new Log({
    content: 'Info log',
    createdBy: ownerUser.id,
    permission: ownerUser.role,
    type: LOG_TYPE.INFO,
  });

  logList = new Map([
    [basicLog.id, basicLog],
    [adminLog.id, adminLog],
    [ownerLog.id, ownerLog],
  ]);

  userList = new Map([
    [adminUser.id, adminUser],
    [basicUser.id, basicUser],
    [ownerUser.id, ownerUser],
  ]);

  logger.logs = logList;
  logger.users = userList;
});

describe('Logger', () => {
  it('Should be instance of Logger', () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it('Should return already created Logger instance, after trying to create a new instance of Logger', () => {
    const secondLoggerSystem = Logger.getInstance();

    expect(logger).toStrictEqual(secondLoggerSystem);
  });

  it('Should create a new log', () => {
    const logId = logger.createLog({
      content: 'Example log',
      createdBy: adminUser.id,
      type: LOG_TYPE.ERROR,
    });

    expect(logger.logs.has(logId)).toBeTruthy();
  });

  it('Should return all logs - owner user', () => {
    const logs = logger.getLogs(ownerUser.id);

    expect(logs).toStrictEqual(logger.logs);
  });

  it('Should return a list of admin and basic users logs', () => {
    const [...logs] = logger.getLogs(adminUser.id);

    expect(logs).toStrictEqual([
      [basicLog.id, basicLog],
      [adminLog.id, adminLog],
    ]);
  });

  it('Should return a list of logs which user created - basic', () => {
    const [...logs] = logger.getLogs(basicUser.id);

    expect(logs).toStrictEqual([[basicLog.id, basicLog]]);
  });

  it('Should delete a log', () => {
    expect(basicLog.isDeleted).toBeFalsy();

    logger.deleteLog(basicLog.id, adminUser.id);

    expect(basicLog.isDeleted).toBeTruthy();
  });

  it('Should find a user', () => {
    const owner = logger.findUser(ownerUser.id);

    expect(owner).toStrictEqual(ownerUser);
  });

  it('Should find a log', () => {
    const log = logger.findLog(adminLog.id);

    expect(log).toStrictEqual(adminLog);
  });

  describe('Should throw error when', () => {
    it('Should throw error when creating log without content', () => {
      expect(() => {
        logger.createLog({
          content: '',
          createdBy: basicUser.id,
          type: LOG_TYPE.ERROR,
        });
      });
    });

    it('Should throw error when creating log with only whitespace', () => {
      expect(() => {
        logger.createLog({
          content: '      ',
          createdBy: basicUser.id,
          type: LOG_TYPE.ERROR,
        });
      });
    });

    it('Should throw error when trying delete deleted log', () => {
      expect(() => {
        logger.deleteLog(ownerLog.id, ownerUser.id);
        logger.deleteLog(ownerLog.id, ownerUser.id);
      });
    });

    it('Should throw error when user is trying to delete a post with higher permission', () => {
      expect(() => {
        logger.deleteLog(ownerLog.id, basicUser.id);
      });
    });

    it('Should throw error when can not find user', () => {
      expect(() => {
        logger.findUser('12345');
      });
    });

    it('Should throw error when can not find log', () => {
      expect(() => {
        logger.findLog('12345');
      });
    });
  });
});
