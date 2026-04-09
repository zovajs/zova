import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCreate } from 'zova-module-rest-actions';

export function BBARestActionsCreate(
  _props: TypeActionOptionsRest<IActionOptionsCreate>,
) {
  return 'rest-actions:create';
}
