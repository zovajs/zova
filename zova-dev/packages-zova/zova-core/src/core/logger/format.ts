import { format, NpmConfigSetLevels, print } from '@cabloy/logger';
import { isEmptyObject } from '@cabloy/utils';

export const formatLoggerFilter = format((info, opts: any) => {
  const level = opts.level;
  if (!level) return false;
  if (opts.strict) {
    if (NpmConfigSetLevels[info.level as string] === NpmConfigSetLevels[level]) return info;
    return false;
  }
  if (NpmConfigSetLevels[info.level as string] <= NpmConfigSetLevels[level] || (opts.silly && info.level === 'silly')) return info;
  return false;
});

export const formatLoggerConsole = () => {
  return print(({ timestamp, level, stack, message, name, durationMs, ...meta }) => {
    const textName = name ? ` ${`[${name}]`}` : '';
    const textMeta = !isEmptyObject(meta) ? ` ${JSON.stringify(meta)}` : '';
    const textMessage = message ? ` ${message}` : '';
    const textDurationMs = durationMs !== undefined ? ` ${`+${durationMs}ms`}` : '';
    const textStack = stack ? `\n${stack}` : '';
    return `${timestamp} ${level}${textName}${textMeta}${textMessage}${textDurationMs}${textStack}`;
  });
};
