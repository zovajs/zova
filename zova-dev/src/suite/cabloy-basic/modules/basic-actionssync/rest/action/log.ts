import type { TypeActionOptionsRest } from 'zova-module-a-action';
import type { IActionOptionsLog } from 'zova-module-basic-actionssync';

export function BBABasicActionssyncLog(
  _props: TypeActionOptionsRest<IActionOptionsLog>,
) {
  return 'basic-actionssync:log';
}
