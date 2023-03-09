import { ILog, Log, LOG_TYPE } from './Log';
import { IUser, User, USER_ROLE } from './User';

const basicUser = new User('example@test.com');
const adminUser = new User('admin@example.com', USER_ROLE.ADMIN);

const warningLog = new Log({
  type: LOG_TYPE.WARNING,
  content: 'Warning log!',
  createdBy: basicUser.id,
  permission: basicUser.role,
});

const errorLog = new Log({
  type: LOG_TYPE.ERROR,
  content: 'Error log!',
  createdBy: adminUser.id,
  permission: adminUser.role,
});

export const logDB: Map<string, ILog> = new Map([
  [warningLog.id, warningLog],
  [errorLog.id, errorLog],
]);

export const userDB: Map<string, IUser> = new Map([
  [basicUser.id, basicUser],
  [adminUser.id, adminUser],
]);
