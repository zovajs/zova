import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsSetValue } from 'zova-module-rest-actions';

export function BBARestActionsSetValue(
  _props: TypeActionOptionsRest<IActionOptionsSetValue>,
) {
  return 'rest-actions:setValue';
}
