import type { AppLoggerClient } from './loggerClient.js';
import type { ILoggerClientChildRecord, ILoggerClientRecord, ILoggerOptionsClientInfo, LoggerLevel, TypeLoggerOptions } from './types.js';
import { BeanSimple } from '../../bean/beanSimple.js';

const SymbolLoggerInstances = Symbol('SymbolLoggerInstances');

export class AppLogger extends BeanSimple {
  private [SymbolLoggerInstances]: Record<keyof ILoggerClientRecord, AppLoggerClient> = {} as any;

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

  private _createClient(clientName: keyof ILoggerClientRecord): AppLoggerClient {
    const configClient = this.app.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend(
      {},
      this._prepareConfigClient(clientName, this.app.config.logger.default),
      this._prepareConfigClient(clientName, configClient),
    );
    const logger = Winston.createLogger(configNode);
    logger.on('error', err => {
      console.error(err);
    });
    return logger;
  }

  private _prepareConfigClient(clientName: keyof ILoggerClientRecord, configClient: TypeLoggerOptions) {
    if (typeof configClient !== 'function') return configClient;
    return configClient.call(this.app, Winston, {
      clientName,
      level: getLoggerClientLevel(clientName),
    });
  }

  public createTransportFile(
    fileName: string,
    clientInfo: ILoggerOptionsClientInfo,
    options: Winston.transports.FileTransportOptions | DailyRotateFile.DailyRotateFileTransportOptions,
  ) {
    const configRotate = this.app.config.logger.rotate;
    let optionsFile;
    if (configRotate.enable) {
      optionsFile = configRotate.options.call(this, fileName, Winston, clientInfo);
    } else {
      optionsFile = { filename: `${fileName}.log` };
    }
    const _options = deepExtend({ dirname: this.app.config.server.loggerDir }, optionsFile, options);
    if (configRotate.enable) {
      const transport = new DailyRotateFile(_options);
      transport.on('error', err => {
        console.error(err);
      });
      return transport;
    } else {
      return new Winston.transports.File(_options);
    }
  }
}

async function _closeLogger(logger: Winston.Logger) {
  return new Promise(resolve => {
    if ((logger as any).__closed__) return resolve(true);
    logger.end(() => {
      (logger as any).__closed__ = true;
      resolve(true);
    });
  });
}

export function getLoggerClientLevel(clientName: keyof ILoggerClientRecord): LoggerLevel | undefined {
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  const level = process.env[envName];
  if (level === 'false') return;
  if (level === 'true' || !level) return 'info';
  return level as LoggerLevel;
}
