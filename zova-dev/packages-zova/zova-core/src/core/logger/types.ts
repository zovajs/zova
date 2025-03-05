import type { LoggerFormat } from './format.js';

export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: LoggerLevel | undefined;
}

export interface LoggerOptions {
  format?: LoggerFormat;
}

export type TypeLoggerOptions = LoggerOptions | ((clientInfo: ILoggerOptionsClientInfo) => LoggerOptions);

export interface ILoggerClientRecord {
  default: never;
}

export interface ILoggerClientChildRecord {}

export interface ConfigLogger {
  default: TypeLoggerOptions;
  clients: Record<keyof ILoggerClientRecord, TypeLoggerOptions>;
}

export type LoggerLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export const npmConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
