import { isEmptyObject } from '@cabloy/utils';
import { npmConfigSetLevels } from './types.js';

function isValidFormat(fmt) {
  if (typeof fmt.transform !== 'function') {
    throw new TypeError([
      'No transform function found on format. Did you create a format instance?',
      'const myFormat = format(formatFn);',
      'const instance = myFormat();',
    ].join('\n'));
  }

  return true;
}

function LoggerFormatCascade(formats) {
  if (!formats.every(isValidFormat)) {
    return;
  }

  return info => {
    let obj = info;
    for (let i = 0; i < formats.length; i++) {
      obj = formats[i].transform(obj, formats[i].options);
      if (!obj) {
        return false;
      }
    }

    return obj;
  };
}

export function loggerFormatCombine(...formats) {
  const combinedFormat = loggerFormat(LoggerFormatCascade(formats));
  return combinedFormat();
}

export class LoggerFormatPrintf {
  template: any;
  constructor(templateFn) {
    this.template = templateFn;
  }

  transform(info) {
    info[LOGGERMESSAGE] = this.template(info);
    return info;
  }
}

export function loggerFormatPrint(opts) {
  return new LoggerFormatPrintf(opts);
}

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
