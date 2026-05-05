import { BeanBase } from 'zova';
import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IPerformActionOptionsCopy } from 'zova-module-basic-openapi';

export type TypeActionCopyResult = unknown;

export interface IActionOptionsCopy extends IPerformActionOptionsCopy<TypeActionCopyResult> {}

@Action<IActionOptionsCopy>()
export class ActionCopy extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsCopy, _renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const res = navigator.clipboard.writeText(options.text);
    return next(res);
  }
}
