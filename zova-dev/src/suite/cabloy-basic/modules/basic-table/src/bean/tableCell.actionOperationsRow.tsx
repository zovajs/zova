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
    if (!actions || actions.length === 0) return false;
    // renders
    const renders: TypeTableCellRenderComponent[] = [];
    for (const action of actions) {
      const actionName = action.name;
      const actionRender = action.options?.render;
      if ($host.$passport.checkPermission(permissions, actionName)) {
        if (!actionRender) throw new Error(`should specify action render: ${actionName}`);
        renders.push(actionRender);
      }
    }
    await $$table.cellRenderPrepare(renders);
    return renders.length > 0;
  }

  render(options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $celScope, $host, $$table } = renderContext;
    const permissions = $celScope.permissions;
    const actions = options.preset?.actionOperationsRow?.actions;
    if (!actions || actions.length === 0) return;
    const domActions: VNode[] = [];
    for (const action of actions) {
      const actionName = action.name;
      if (!$host.$passport.checkPermission(permissions, actionName)) continue;
      const options2 = Object.assign({ key: actionName }, action.options);
      domActions.push($$table.cellRender(options2, renderContext));
    }
    return <div class="join">{domActions}</div>;
  }
}
