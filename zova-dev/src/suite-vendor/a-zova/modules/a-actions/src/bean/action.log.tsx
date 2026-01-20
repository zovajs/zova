import { BeanBase, Preload } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionLogResult = unknown;

export interface IActionOptionsLog extends IDecoratorActionOptions<TypeActionLogResult> {
  message: string;
}

@Action<IActionOptionsLog>()
@Preload()
export class ActionLog extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsLog, _renderContext: IRenderContextBase, next: NextActionExecute) {
    this.$logger.silly(options.message === undefined ? '' : options.message);
    return next();
  }
}
