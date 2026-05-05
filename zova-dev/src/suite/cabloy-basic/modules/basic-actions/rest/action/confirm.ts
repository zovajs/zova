import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsConfirm } from 'zova-module-basic-actions';

export function BBABasicActionsConfirm(
  _props: TypeActionOptionsRest<IActionOptionsConfirm>,
) {
  return 'basic-actions:confirm';
}
