import { BeanBase } from 'zova';
import {
  Action,
  IActionExecute,
  IDecoratorActionOptions,
  NextActionExecute,
} from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionConfirmResult = boolean;

export interface IActionOptionsConfirm extends IDecoratorActionOptions<TypeActionConfirmResult> {
  message: string;
}

@Action<IActionOptionsConfirm>()
export class ActionConfirm extends BeanBase implements IActionExecute {
  execute(
    options: IActionOptionsConfirm,
    _renderContext: IJsxRenderContextBase,
    next: NextActionExecute,
  ) {
    // eslint-disable-next-line no-alert
    const res = window.confirm(options.message);
    return next(res);
  }
}
