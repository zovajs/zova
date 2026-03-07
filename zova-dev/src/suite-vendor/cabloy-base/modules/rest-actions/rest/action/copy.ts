import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsCopy } from '../../src/bean/action.copy.jsx';

export function AARestActionsCopy(
  _props: TypeActionOptionsRest<IActionOptionsCopy>,
) {
  return 'rest-actions:copy';
}
