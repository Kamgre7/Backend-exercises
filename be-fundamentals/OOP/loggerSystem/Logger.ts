import { Log, LOG_TYPE, ILog } from './Log';
import { logDB, userDB } from './LoggerDB';
import { IUser, USER_ROLE } from './User';

const accessMapper = {
  [USER_ROLE.BASIC]: 0,
  [USER_ROLE.ADMIN]: 1,
  [USER_ROLE.OWNER]: 2,
};

type LogInfoFromUser = {
  content: string;
  type: LOG_TYPE;
  createdBy: string;
};

interface ILogger {
  logs: Map<string, ILog>;
  users: Map<string, IUser>;
  clearInstance(): void;
  createLog(logData: LogInfoFromUser): string;
  getLogs(userId: string): Map<string, ILog>;
  findUser(userId: string): IUser;
  findLog(logId: string): ILog;
  deleteLog(logId: string, userId: string): void;
}

export class Logger implements ILogger {
  private static instance: Logger;

  private constructor(public logs = logDB, public users = userDB) {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(logDB, userDB);
    }

    return Logger.instance;
  }

  clearInstance() {
    Logger.instance = null;
  }

  createLog(logData: LogInfoFromUser): string {
    const { content, type, createdBy } = logData;
    const user = this.findUser(createdBy);

    const newLog = new Log({
      type,
      content,
      createdBy,
      permission: user.role,
    });

    this.logs.set(newLog.id, newLog);

    return newLog.id;
  }

  getLogs(userId: string): Map<string, ILog> {
    const user = this.findUser(userId);

    switch (user.role) {
      case USER_ROLE.BASIC:
        return this.getBasicLogs(userId);

      case USER_ROLE.ADMIN:
        return this.getAdminLogs();

      case USER_ROLE.OWNER:
        return this.getOwnerLogs();

      default:
        throw new Error('Error, try again later');
    }
  }

  deleteLog(logId: string, userId: string): void {
    const log = this.findLog(logId);
    const user = this.findUser(userId);

    if (
      user.role === USER_ROLE.BASIC ||
      !this.isUserAllowed(user.role, log.permission)
    ) {
      throw new Error('Forbidden resource');
    }

    log.delete(userId);
  }

  findUser(userId: string): IUser {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }

  findLog(logId: string): ILog {
    if (!this.logs.has(logId)) {
      throw new Error('Log not found');
    }

    return this.logs.get(logId);
  }

  private isUserAllowed(
    userRole: USER_ROLE,
    logPermissions: USER_ROLE
  ): boolean {
    return accessMapper[userRole] >= accessMapper[logPermissions];
  }

  private getOwnerLogs(): Map<string, ILog> {
    return this.logs;
  }

  private getAdminLogs(): Map<string, ILog> {
    const logs = [...this.logs].filter(
      ([key, log]) =>
        log.permission === USER_ROLE.ADMIN || log.permission === USER_ROLE.BASIC
    );

    return new Map([...logs]);
  }

  private getBasicLogs(userId: string): Map<string, ILog> {
    const logs = [...this.logs].filter(
      ([key, log]) => log.createdBy === userId && !log.isDeleted
    );

    return new Map([...logs]);
  }
}

export const logger = Logger.getInstance();
