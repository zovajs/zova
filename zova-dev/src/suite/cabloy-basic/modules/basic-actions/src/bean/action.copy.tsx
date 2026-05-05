import { BeanBase } from 'zova';
import {
  Action,
  IActionExecute,
  IDecoratorActionOptions,
  NextActionExecute,
} from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionCopyResult = unknown;

export interface IActionOptionsCopy extends IDecoratorActionOptions<TypeActionCopyResult> {
  text: any;
}

@Action<IActionOptionsCopy>()
export class ActionCopy extends BeanBase implements IActionExecute {
  execute(
    options: IActionOptionsCopy,
    _renderContext: IJsxRenderContextBase,
    next: NextActionExecute,
  ) {
    const res = navigator.clipboard.writeText(options.text);
    return next(res);
  }
}
