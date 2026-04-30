import { typedKeys } from '@cabloy/utils';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { TypeTableCellRenderComponent } from 'zova-module-a-openapi';
import {
  IDecoratorTableCellPresetOptions,
  IJsxRenderContextTableCell,
  IJsxRenderContextTableColumn,
  ITableCellRender,
  NextTableCellRender,
  TableCell,
} from 'zova-module-a-table';

export interface ITableCellOptionsActionOperationsRow extends IDecoratorTableCellPresetOptions {}

@TableCell<ITableCellOptionsActionOperationsRow>()
export class TableCellActionOperationsRow extends BeanBase implements ITableCellRender {
  async checkVisible(options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableColumn): Promise<boolean> {
    const { $celScope, $host, $$table } = renderContext;
    const permissions = $celScope.permissions;
    let actions = options.preset?.actionOperationsRow?.actions;
    if (!actions) return false;
    // renders
    const renders: TypeTableCellRenderComponent[] = [];
    for (const actionName of typedKeys(actions)) {
      const action = actions[actionName];
      // action maybe false
      if (!!action && $host.$passport.checkPermission(permissions, actionName)) {
        if (!action.render) throw new Error(`should specify action render: ${actionName}`);
        renders.push(action.render);
      }
    }
    await $$table.cellRenderPrepare(renders);
    return renders.length > 0;
  }

  render(options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $celScope, $host, $$table } = renderContext;
    const permissions = $celScope.permissions;
    const actions = options.preset?.actionOperationsRow?.actions;
    if (!actions) return;
    const domActions: VNode[] = [];
    for (const actionName of typedKeys(actions)) {
      const action = actions[actionName];
      if (!action || !$host.$passport.checkPermission(permissions, actionName)) continue;
      domActions.push($$table.cellRender(action, renderContext));
    }
    return <div class="flex gap-2">{domActions}</div>;
  }
}
