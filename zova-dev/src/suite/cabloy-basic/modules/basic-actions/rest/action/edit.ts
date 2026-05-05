import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsEdit } from 'zova-module-basic-actions';

export function BBABasicActionsEdit(
  _props: TypeActionOptionsRest<IActionOptionsEdit>,
) {
  return 'basic-actions:edit';
}
