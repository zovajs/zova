import { DateTime } from 'luxon';
import { TypeDateFormat } from 'zova-module-a-openapi';

export function dateFormatUtil(value: any, options?: TypeDateFormat) {
  if (!value) return;
  if (!options) return value;
  const datetime = DateTime.fromJSDate(value);
  if (typeof options === 'string') {
    return datetime.toFormat(options);
  } else if (typeof options === 'object' && options.preset) {
    return datetime.toLocaleString(DateTime[options.preset]);
  }
  return value;
}
