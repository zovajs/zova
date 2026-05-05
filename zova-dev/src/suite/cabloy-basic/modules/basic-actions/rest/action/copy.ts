import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCopy } from 'zova-module-basic-actions';

export function BBABasicActionsCopy(
  _props: TypeActionOptionsRest<IActionOptionsCopy>,
) {
  return 'basic-actions:copy';
}
