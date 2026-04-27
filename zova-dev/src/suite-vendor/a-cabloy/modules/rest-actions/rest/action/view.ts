import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsView } from 'zova-module-rest-actions';

export function BBARestActionsView(
  _props: TypeActionOptionsRest<IActionOptionsView>,
) {
  return 'rest-actions:view';
}
