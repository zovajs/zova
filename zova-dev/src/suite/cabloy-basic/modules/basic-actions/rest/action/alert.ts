import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsAlert } from 'zova-module-basic-actions';

export function BBABasicActionsAlert(
  _props: TypeActionOptionsRest<IActionOptionsAlert>,
) {
  return 'basic-actions:alert';
}
