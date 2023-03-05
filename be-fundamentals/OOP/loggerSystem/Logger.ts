import { Log, LogInformation } from './Log';
import { LoggerDB } from './LoggerDB';
import { User, UserRole } from './User';

interface ILogger {
  logs: Log[];
  createLog(log: LogInformation): string;
  getAllLogs(): Log[];
  getAdminLogs(): Log[];
  getBasicLogs(): Log[];
  getAdminAndBasicLogs(): Log[];
  getUserLogs(userId: string): Log[];
  deleteLog(logId: string, user: User): void;
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

  createLog(log: LogInformation): string {
    const newLog = new Log(log);
    this.logs.push(newLog);

    return newLog.id;
  }

  getAllLogs(): Log[] {
    return this.logs.filter((log) => log.isDeleted === false);
  }

  getAdminLogs(): Log[] {
    return this.logs.filter(
      (log) => log.createdBy.role === UserRole.ADMIN && log.isDeleted === false
    );
  }

  getBasicLogs(): Log[] {
    return this.logs.filter(
      (log) => log.createdBy.role === UserRole.BASIC && log.isDeleted === false
    );
  }

  getAdminAndBasicLogs(): Log[] {
    return [...this.getAdminLogs(), ...this.getBasicLogs()];
  }

  getUserLogs(userId: string): Log[] {
    return this.logs.filter((log) => log.createdBy.id === userId);
  }

  getDeletedLogs(): Log[] {
    return this.logs.filter((log) => log.isDeleted === true);
  }

  deleteLog(logId: string, user: User): void {
    const log = this.logs.find((log) => log.id === logId);
    log.delete(user);
  }
}

export const logger = Logger.getInstance();
