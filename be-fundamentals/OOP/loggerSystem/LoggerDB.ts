import { Log, LogType } from './Log';
import { User, UserRole } from './User';

const basicUser = new User('example@test.com');
const adminUser = new User('admin@example.com');
adminUser.role = UserRole.ADMIN;

const warningLog = new Log({
  type: LogType.WARNING,
  content: 'Warning log!',
  createdBy: basicUser.id,
  permission: basicUser.role,
});

const errorLog = new Log({
  type: LogType.ERROR,
  content: 'Error log!',
  createdBy: adminUser.id,
  permission: adminUser.role,
});

export const LoggerDB: Log[] = [warningLog, errorLog];
export const userDB: User[] = [basicUser, adminUser];
