import { DateTime } from 'luxon';
import { IDateOptions } from 'zova-module-basic-openapi';

export function dateFormatUtil(value: any, options?: IDateOptions) {
  if (!value) return;
  if (!options) return value;
  const datetime = DateTime.fromJSDate(value);
  if (options.format) {
    return datetime.toFormat(options.format);
  } else if (options.preset) {
    return datetime.toLocaleString(DateTime[options.preset]);
  }
  return value;
}
