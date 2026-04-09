import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsDelete } from 'zova-module-rest-actions';

export function BBARestActionsDelete(
  _props: TypeActionOptionsRest<IActionOptionsDelete>,
) {
  return 'rest-actions:delete';
}
