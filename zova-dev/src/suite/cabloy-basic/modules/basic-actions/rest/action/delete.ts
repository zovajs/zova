import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsDelete } from 'zova-module-basic-actions';

export function BBABasicActionsDelete(
  _props: TypeActionOptionsRest<IActionOptionsDelete>,
) {
  return 'basic-actions:delete';
}
