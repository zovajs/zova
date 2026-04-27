import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsAlert } from 'zova-module-rest-actions';

export function BBARestActionsAlert(
  _props: TypeActionOptionsRest<IActionOptionsAlert>,
) {
  return 'rest-actions:alert';
}
