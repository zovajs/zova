import { BeanBase } from 'zova';
import { $performAction } from 'zova-module-a-action';
import { ZIcon } from 'zova-module-a-icon';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionOperationsRow extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionOperationsRow>()
export class TableCellActionOperationsRow extends BeanBase implements ITableCellRender {
  render(_options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $celScope } = renderContext;
    return (
      <div class="flex gap-2">
        {$celScope.permissions?.row?.update && (
          <button
            class="btn btn-outline btn-primary"
            onClick={() => {
              const actionName = $jsx.normalizeAction('actionEdit');
              $performAction(actionName, undefined, renderContext);
            }}
          >
            <ZIcon name="::draft"></ZIcon>
          </button>
        )}
        {$celScope.permissions?.row?.delete && (
          <button
            class="btn btn-outline btn-error"
            onClick={async () => {
              // eslint-disable-next-line no-alert
              if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
              const actionName = $jsx.normalizeAction('actionDelete');
              await $performAction(actionName, undefined, renderContext);
            }}
          >
            <ZIcon name="::delete"></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
