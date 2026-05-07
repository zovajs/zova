import type { IActionExecute, IActionOptionsBase } from 'zova-module-a-action';
import type { NextActionExecute } from 'zova-module-a-action';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanBase } from 'zova';
import { Action } from 'zova-module-a-action';

export type TypeActionAlertResult = unknown;

export interface IActionOptionsAlert extends IActionOptionsBase<TypeActionAlertResult> {
  message: string;
  wait?: boolean;
}

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
