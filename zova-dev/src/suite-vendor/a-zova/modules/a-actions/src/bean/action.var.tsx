import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionVarResult = unknown;

export interface IActionOptionsVar extends IDecoratorActionOptions<TypeActionVarResult> {}

@Action<IActionOptionsVar>()
export class ActionVar extends BeanBase implements IActionExecute {
  execute(_options: IActionOptionsVar, _renderContext: IRenderContextBase, next: NextActionExecute) {
    return next();
  }
}
