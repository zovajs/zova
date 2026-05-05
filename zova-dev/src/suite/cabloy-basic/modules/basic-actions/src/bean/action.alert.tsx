import type { IActionExecute } from 'zova-module-a-action';
import type { NextActionExecute } from 'zova-module-a-action';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanBase } from 'zova';
import { Action } from 'zova-module-a-action';
import { IPerformActionOptionsAlert } from 'zova-module-basic-openapi';

export type TypeActionAlertResult = unknown;

export interface IActionOptionsAlert extends IPerformActionOptionsAlert<TypeActionAlertResult> {}

@Action<IActionOptionsAlert>({ wait: true })
export class ActionAlert extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsAlert, _renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    if (options.wait) {
      // eslint-disable-next-line no-alert
      window.alert(options.message);
    } else {
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        window.alert(options.message);
      }, 0);
    }
    return next();
  }
}
