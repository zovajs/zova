import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionAlertResult = unknown;

export interface IActionOptionsAlert extends IDecoratorActionOptions<TypeActionAlertResult> {
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
