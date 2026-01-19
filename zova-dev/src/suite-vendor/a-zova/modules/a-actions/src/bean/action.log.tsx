import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionLogResult = unknown;

export interface IActionOptionsLog extends IDecoratorActionOptions<TypeActionLogResult> {}

@Action<IActionOptionsLog>()
export class ActionLog extends BeanBase implements IActionExecute {
  static $preload = true;

  execute(_options: IActionOptionsLog, _renderContext: IRenderContextBase, next: NextActionExecute) {
    return next();
  }
}
