import type { LoggerLevel, LoggerOptions } from '@cabloy/logger';

export type { LoggerLevel } from '@cabloy/logger';

export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: LoggerLevel | undefined;
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
