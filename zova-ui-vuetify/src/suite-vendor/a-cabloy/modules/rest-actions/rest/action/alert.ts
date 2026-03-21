import type { TypeActionOptionsRest } from 'zova-module-a-action';

import type { IActionOptionsAlert } from '../../src/bean/action.alert.jsx';

export function AARestActionsAlert(_props: TypeActionOptionsRest<IActionOptionsAlert>) {
  return 'rest-actions:alert';
}
