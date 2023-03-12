import { v4 as uuid } from 'uuid';
import { USER_ROLE } from './User';

export enum LOG_TYPE {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

type LogInformation = {
  type: LOG_TYPE;
  content: string;
  permission: USER_ROLE;
  createdBy: string;
};

export interface ILog extends LogInformation {
  id: string;
  isDeleted: boolean;
  deletedBy: string;
  deletedAt: Date;
  createdAt: Date;
  delete(userId: string): void;
}

export class Log implements ILog {
  type: LOG_TYPE;
  content: string;
  createdBy: string;
  createdAt: Date = new Date();
  permission: USER_ROLE;
  isDeleted: boolean = false;
  deletedBy: string;
  deletedAt: Date;

  constructor(logData: LogInformation, public readonly id = uuid()) {
    this.checkIfNotEmptyString(logData.content);

    this.type = logData.type;
    this.content = logData.content;
    this.permission = logData.permission;
    this.createdBy = logData.createdBy;
  }

  delete(userId: string): void {
    if (this.isDeleted) {
      throw new Error('Log already deleted');
    }

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
