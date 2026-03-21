import type { TypeActionOptionsRest } from 'zova-module-a-action';

import type { IActionOptionsDelete } from '../../src/bean/action.delete.jsx';

export function AARestActionsDelete(_props: TypeActionOptionsRest<IActionOptionsDelete>) {
  return 'rest-actions:delete';
}
