import type { ZovaApplication } from '../app/application.js';
import type { ConfigLogger } from './types.js';
import { colorizer, combine, errors, splatter, timestamp } from '@cabloy/logger';
import { formatLoggerConsole, formatLoggerFilter } from './format.js';

export function combineLoggerDefault() {
  const configDefault: ConfigLogger = {
    default(this: ZovaApplication, clientInfo) {
      return {
        format: combine(
          splatter(),
          errors({ stack: true }),
          timestamp(),
          formatLoggerFilter({ level: clientInfo.level, silly: true }),
          colorizer(),
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
