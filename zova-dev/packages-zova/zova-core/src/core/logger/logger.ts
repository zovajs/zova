import type { LoggerLevel } from '@cabloy/logger';
import type { ILoggerClientChildRecord, ILoggerClientRecord, TypeLoggerOptions } from './types.js';
import { Logger } from '@cabloy/logger';
import { BeanSimple } from '../../bean/beanSimple.js';
import { deepExtend } from '../sys/util.js';

const SymbolLoggerInstances = Symbol('SymbolLoggerInstances');

export class AppLogger extends BeanSimple {
  private [SymbolLoggerInstances]: Record<keyof ILoggerClientRecord, Logger> = {} as any;

  public async dispose() {
    for (const key in this[SymbolLoggerInstances]) {
      const logger = this[SymbolLoggerInstances][key];
      await _closeLogger(logger);
    }
  }

  get(clientName?: keyof ILoggerClientRecord) {
    clientName = clientName || 'default';
    if (!this[SymbolLoggerInstances][clientName]) {
      this[SymbolLoggerInstances][clientName] = this._createClient(clientName);
    }
    return this[SymbolLoggerInstances][clientName];
  }

  child(childName?: keyof ILoggerClientChildRecord, clientName?: keyof ILoggerClientRecord) {
    const logger = this.get(clientName);
    if (!childName) return logger;
    return logger.child({ name: childName });
  }

  getLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | undefined {
    return getLoggerClientLevel(clientName);
  }

  setLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
    setLoggerClientLevel(level, clientName);
  }

  private _createClient(clientName: keyof ILoggerClientRecord): Logger {
    const configClient = this.app.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend(
      {},
      this._prepareConfigClient(clientName, this.app.config.logger.default),
      this._prepareConfigClient(clientName, configClient as unknown as TypeLoggerOptions),
    );
    const logger = new Logger(configNode);
    return logger;
  }

  private _prepareConfigClient(clientName: keyof ILoggerClientRecord, configClient: TypeLoggerOptions) {
    if (typeof configClient !== 'function') return configClient;
    return configClient.call(this.app, {
      clientName,
      level: () => getLoggerClientLevel(clientName),
    });
  }
}

async function _closeLogger(logger: Logger) {
  if ((logger as any).__closed__) return;
  await logger.end();
  (logger as any).__closed__ = true;
}

export function getLoggerClientLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | undefined {
  clientName = clientName || 'default';
  if (process.env.PROD) return; // disable on prod
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  const level = process.env[envName];
  if (level === 'false') return;
  if (level === 'true' || !level) return 'info';
  return level as LoggerLevel;
}

export function setLoggerClientLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
  clientName = clientName || 'default';
  if (process.env.PROD) return; // disable on prod
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  process.env[envName] = level.toString();
}
