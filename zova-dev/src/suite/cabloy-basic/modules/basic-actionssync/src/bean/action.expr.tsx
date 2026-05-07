import type { IJsxRenderContextBase, IPerformActionOptionsBase } from 'zova-module-a-openapi';

import { BeanBase, Preload } from 'zova';
import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';

export type TypeActionExprResult = unknown;

export interface IActionOptionsExpr extends IPerformActionOptionsBase<TypeActionExprResult> {
  expression: string;
}

@Action<IActionOptionsExpr>()
@Preload()
export class ActionExpr extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsExpr, _renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    return next(options.expression);
  }
}
