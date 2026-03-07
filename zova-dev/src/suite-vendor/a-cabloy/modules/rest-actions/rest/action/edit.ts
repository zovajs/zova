import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsEdit } from '../../src/bean/action.edit.jsx';

export function AARestActionsEdit(
  _props: TypeActionOptionsRest<IActionOptionsEdit>,
) {
  return 'rest-actions:edit';
}
