import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsConfirm } from '../../src/bean/action.confirm.jsx';

export function AARestActionsConfirm(
  _props: TypeActionOptionsRest<IActionOptionsConfirm>,
) {
  return 'rest-actions:confirm';
}
