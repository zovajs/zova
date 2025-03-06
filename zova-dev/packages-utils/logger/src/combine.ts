import { cascade } from './cascade.js';
import { format } from './format.js';

export function combine(...formats) {
  const combinedFormat = format(cascade(formats));
  return combinedFormat();
}
