import { Log, LogType } from './Log';
import { LoggerDB, userDB } from './LoggerDB';
import { User, UserRole } from './User';

type LogInfoFromUser = {
  content: string;
  type: LogType;
  createdBy: string;
};

interface ILogger {
  logs: Log[];
  createLog(logData: LogInfoFromUser): string;
  deleteLog(logId: string, userId: string): void;
}
export class Logger implements ILogger {
  private static instance: Logger;
  logs: Log[] = LoggerDB;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
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

    this.logs.push(newLog);

    return newLog.id;
  }

  getLogs(userId: string): Log[] {
    const user = this.findUser(userId);

    switch (user.role) {
      case UserRole.BASIC:
        return this.getBasicLogs(userId);

      case UserRole.ADMIN:
        return this.getAdminLogs();

      case UserRole.OWNER:
        return this.getOwnerLogs();

      default:
        throw new Error('Error, try again later');
    }
  }

  deleteLog(logId: string, userId: string): void {
    const log = this.findLog(logId);

    switch (log.permission) {
      case UserRole.BASIC:
        this.checkUserRole(userId, [UserRole.OWNER, UserRole.ADMIN]);
        break;

      case UserRole.ADMIN:
        this.checkUserRole(userId, [UserRole.OWNER, UserRole.ADMIN]);
        break;

      case UserRole.OWNER:
        this.checkUserRole(userId, [UserRole.OWNER]);
        break;

      default:
        throw new Error('Error, try again later');
    }

    log.delete(userId);
  }

  findUser(userId: string): User {
    const user = userDB.find((user) => user.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  findLog(logId: string): Log {
    const log = this.logs.find((log) => log.id === logId);

    if (!log) {
      throw new Error('Log not found');
    }

    return log;
  }

  private getOwnerLogs(): Log[] {
    return this.logs.filter((log) => log.isDeleted === false);
  }

  private getAdminLogs(): Log[] {
    return this.logs.filter(
      (log) =>
        (log.permission === UserRole.ADMIN ||
          log.permission === UserRole.BASIC) &&
        log.isDeleted === false
    );
  }

  private getBasicLogs(userId: string): Log[] {
    return this.logs.filter(
      (log) => log.createdBy === userId && log.isDeleted === false
    );
  }

  private checkUserRole(userId: string, roles: UserRole[]): void {
    const user = this.findUser(userId);
    const isAllowed = roles.some((role) => role === user.role);

    if (!isAllowed) {
      throw new Error('Forbidden resource');
    }
  }
}

export const logger = Logger.getInstance();
