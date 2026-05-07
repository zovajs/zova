import type { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanBase, Preload } from 'zova';
import { Action, type IActionExecute, type IActionOptionsBase, type NextActionExecute } from 'zova-module-a-action';

export type TypeActionExprResult = unknown;

export interface IActionOptionsExpr extends IActionOptionsBase<TypeActionExprResult> {
  expression: string;
}

@Action<IActionOptionsExpr>()
@Preload()
export class ActionExpr extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsExpr, _renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    return next(options.expression);
  }
}
