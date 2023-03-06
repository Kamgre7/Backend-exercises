import { v4 as uuid } from 'uuid';
import { UserRole } from './User';

export enum LogType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

type LogInformation = {
  type: LogType;
  content: string;
  permission: UserRole;
  createdBy: string;
};

interface ILog extends LogInformation {
  id: string;
  isDeleted: boolean;
  deletedBy: string;
  deletedAt: Date;
  createdAt: Date;
  delete(userId: string): void;
}

export class Log implements ILog {
  type: LogType;
  content: string;
  createdBy: string;
  createdAt: Date = new Date();
  permission: UserRole;
  isDeleted: boolean = false;
  deletedBy: string;
  deletedAt: Date;

  constructor(logData: LogInformation, public readonly id = uuid()) {
    this.checkIfNotEmptyString(logData.content);

    this.type = logData.type;
    this.content = logData.content;
    this.createdBy = logData.createdBy;
  }

  delete(userId: string): void {
    this.isDeleted = true;
    this.deletedBy = userId;
    this.deletedAt = new Date();
  }

  private checkIfNotEmptyString(content: string): void {
    const contentTrim = content.trim();

    if (contentTrim.length === 0) {
      throw new Error('Empty content!');
    }
  }
}
