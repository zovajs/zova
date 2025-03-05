import type { ZovaApplication } from '../app/application.js';
import type { ConfigLogger } from './types.js';
import { formatLoggerConsole, formatLoggerFilter, loggerFormatCombine } from './format.js';

export function combineLoggerDefault() {
  const configDefault: ConfigLogger = {
    default(this: ZovaApplication, clientInfo) {
      return {
        format: loggerFormatCombine(
          formatLoggerFilter({ level: clientInfo.level, silly: true }),
          formatLoggerConsole(),
        ),
      };
    },
    clients: {
      default: {},
    },
  };
  return configDefault;
}
