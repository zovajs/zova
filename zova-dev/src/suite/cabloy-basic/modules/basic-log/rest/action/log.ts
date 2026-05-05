import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsLog } from 'zova-module-basic-log';

export function BBABasicLog(
  _props: TypeActionOptionsRest<IActionOptionsLog>,
) {
  return 'basic-log:log';
}
