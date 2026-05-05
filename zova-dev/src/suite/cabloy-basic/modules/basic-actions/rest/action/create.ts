import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCreate } from 'zova-module-basic-actions';

export function BBABasicActionsCreate(
  _props: TypeActionOptionsRest<IActionOptionsCreate>,
) {
  return 'basic-actions:create';
}
