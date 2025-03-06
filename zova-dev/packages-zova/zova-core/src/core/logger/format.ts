import { colorize, format, NpmConfigSetLevels, print } from '@cabloy/logger';
import { isEmptyObject } from '@cabloy/utils';

export const formatLoggerFilter = format((info, opts: any) => {
  const level = opts.level();
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
    const textName = name ? ` ${colorize('verbose', `[${name}]`)}` : '';
    const textMessage = message ? ` ${message}` : '';
    const textDurationMs = durationMs !== undefined ? ` ${colorize('verbose', `+${durationMs}ms`)}` : '';
    const textStack = stack ? `\n${stack}` : '';
    const result: any[] = [`${timestamp} ${level}${textName}${textMessage}${textDurationMs}${textStack}`];
    if (!isEmptyObject(meta)) {
      const meta2 = {};
      for (const key in meta) {
        meta2[key] = meta[key];
      }
      result.push(meta2);
    }
    return result;
  });
};
