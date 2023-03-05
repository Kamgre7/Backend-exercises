import { v4 as uuid } from 'uuid';
import { User } from './User';

export enum LogType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

export type LogInformation = {
  type: LogType;
  content: string;
  createdBy: User;
};

interface ILog extends LogInformation {
  id: string;
  isDeleted: boolean;
  deletedBy: User;
  deletedAt: Date;
  createdAt: Date;
  delete(user: User): void;
}

export class Log implements ILog {
  type: LogType;
  content: string;
  deletedBy: User;
  deletedAt: Date;
  createdBy: User;
  isDeleted: boolean = false;
  createdAt: Date = new Date();

  constructor(logData: LogInformation, public readonly id = uuid()) {
    this.type = logData.type;
    this.content = logData.content;
    this.createdBy = logData.createdBy;
  }

  delete(user: User): void {
    this.isDeleted = true;
    this.deletedBy = user;
    this.deletedAt = new Date();
  }
}
