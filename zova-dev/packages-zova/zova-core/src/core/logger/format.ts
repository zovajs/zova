import { isEmptyObject } from '@cabloy/utils';
import { npmConfigSetLevels } from './types.js';

export const formatLoggerFilter = loggerFormat((info, opts: any) => {
  const level = opts.level;
  if (!level) return false;
  if (opts.strict) {
    if (npmConfigSetLevels[info.level] === npmConfigSetLevels[level]) return info;
    return false;
  }
  if (npmConfigSetLevels[info.level] <= npmConfigSetLevels[level] || (opts.silly && info.level === 'silly')) return info;
  return false;
});

export const formatLoggerConsole = () => {
  return loggerFormatPrint(({ timestamp, level, stack, message, name, durationMs, ...meta }) => {
    const textName = name ? ` ${`[${name}]`}` : '';
    const textMeta = !isEmptyObject(meta) ? ` ${JSON.stringify(meta)}` : '';
    const textMessage = message ? ` ${message}` : '';
    const textDurationMs = durationMs !== undefined ? ` ${`+${durationMs}ms`}` : '';
    const textStack = stack ? `\n${stack}` : '';
    return `${timestamp} ${level}${textName}${textMeta}${textMessage}${textDurationMs}${textStack}`;
  });
};
