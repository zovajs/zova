import type { LoggerLevel } from '@cabloy/logger';

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
