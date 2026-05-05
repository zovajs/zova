import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsView } from 'zova-module-basic-actions';

export function BBABasicActionsView(
  _props: TypeActionOptionsRest<IActionOptionsView>,
) {
  return 'basic-actions:view';
}
