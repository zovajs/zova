import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IRenderContextBase } from 'zova-module-a-openapi';

export interface IActionOptionsView extends IDecoratorActionOptions {}

@Action<IActionOptionsView>()
export class ActionView extends BeanBase implements IActionExecute {
  execute(_options: IActionOptionsView, _renderContext: IRenderContextBase, next: NextActionExecute) {
    return next();
  }
}
