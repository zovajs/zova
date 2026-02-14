import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell } from 'zova-module-a-table';

export type TypeActionDeleteResult = unknown;

export interface IActionOptionsDelete extends IDecoratorActionOptions<TypeActionDeleteResult> {
  id?: string;
}

@Action<IActionOptionsDelete>()
export class ActionDelete extends BeanBase implements IActionExecute {
  async execute(options: IActionOptionsDelete, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    if (renderContext.$scene === 'tableCell') {
      const { $celScope, cellContext } = renderContext as IJsxRenderContextTableCell;
      const id = options.id ?? cellContext.row.id;
      await $celScope.onActionRow?.('delete', id);
    }
    return next();
  }
}
