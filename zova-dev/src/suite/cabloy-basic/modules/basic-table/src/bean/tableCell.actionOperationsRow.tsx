import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
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
    const renders: TypeTableCellRenderComponent[] = [];
    for (const actionName in actions) {
      const action = actions[actionName];
      // actions[actionName] maybe false
      if (!!action && $host.$passport.checkPermission(permissions, actionName as any)) {
        renders.push(action);
      }
    }
    return false;
  }

  render(options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $celScope, $host } = renderContext;
    const actions = options.preset?.actionOperationsRow?.actions;
    const permissions = $celScope.permissions;
    const permissionUpdate = $host.$passport.checkPermission(permissions, 'update');
    const permissionDelete = $host.$passport.checkPermission(permissions, 'delete');
    return (
      <div class="flex gap-2">
        {permissionUpdate && (
          <button
            class="btn btn-outline btn-primary"
            onClick={async () => {
              const actionName = $jsx.normalizeAction('actionEdit');
              await $host.$performAction(actionName, undefined, renderContext);
            }}
          >
            <ZIcon name="::draft" width={24}></ZIcon>
          </button>
        )}
        {permissionDelete && (
          <button
            class="btn btn-outline btn-error"
            onClick={async () => {
              // eslint-disable-next-line no-alert
              if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
              const actionName = $jsx.normalizeAction('actionDelete');
              await $host.$performAction(actionName, undefined, renderContext);
            }}
          >
            <ZIcon name="::delete" width={24}></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
