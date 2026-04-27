import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsConfirm } from 'zova-module-rest-actions';

export function BBARestActionsConfirm(
  _props: TypeActionOptionsRest<IActionOptionsConfirm>,
) {
  return 'rest-actions:confirm';
}
