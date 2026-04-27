import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCopy } from 'zova-module-rest-actions';

export function BBARestActionsCopy(
  _props: TypeActionOptionsRest<IActionOptionsCopy>,
) {
  return 'rest-actions:copy';
}
