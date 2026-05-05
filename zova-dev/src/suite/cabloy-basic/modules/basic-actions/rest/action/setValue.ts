import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsSetValue } from 'zova-module-basic-actions';

export function BBABasicActionsSetValue(
  _props: TypeActionOptionsRest<IActionOptionsSetValue>,
) {
  return 'basic-actions:setValue';
}
