export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: LoggerLevel | undefined;
}

export interface LoggerOptions {
  level?: string;
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
