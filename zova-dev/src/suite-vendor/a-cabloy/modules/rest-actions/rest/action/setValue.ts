import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsSetValue } from '../../src/bean/action.setValue.jsx';

export function AARestActionsSetValue(
  _props: TypeActionOptionsRest<IActionOptionsSetValue>,
) {
  return 'rest-actions:setValue';
}
