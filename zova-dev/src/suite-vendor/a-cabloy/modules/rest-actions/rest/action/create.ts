import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCreate } from '../../src/bean/action.create.jsx';

export function AARestActionsCreate(
  _props: TypeActionOptionsRest<IActionOptionsCreate>,
) {
  return 'rest-actions:create';
}
