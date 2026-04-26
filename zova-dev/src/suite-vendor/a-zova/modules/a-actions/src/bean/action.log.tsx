import { isNil } from '@cabloy/utils';
import { BeanBase, Preload } from 'zova';
import {
  Action,
  IActionExecute,
  IDecoratorActionOptions,
  NextActionExecute,
} from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionLogResult = unknown;

export interface IActionOptionsLog extends IDecoratorActionOptions<TypeActionLogResult> {
  name?: string;
  message: any;
}

@Action<IActionOptionsLog>()
@Preload()
export class ActionLog extends BeanBase implements IActionExecute {
  execute(
    options: IActionOptionsLog,
    _renderContext: IJsxRenderContextBase,
    next: NextActionExecute,
  ) {
    if (process.env.CLIENT) {
      const name = options.name;
      const message = options.message;
      if (isNil(name)) {
        console.log(message);
      } else {
        console.log(name, message);
      }
    }
    return next();
  }
}
