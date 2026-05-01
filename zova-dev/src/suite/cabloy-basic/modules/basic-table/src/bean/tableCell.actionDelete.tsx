import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import {
  IDecoratorTableCellPresetOptions,
  IJsxRenderContextTableCell,
  IJsxRenderContextTableColumn,
  ITableCellRender,
  NextTableCellRender,
  TableCell,
} from 'zova-module-a-table';

export interface ITableCellOptionsActionDelete extends IDecoratorTableCellPresetOptions {}

@TableCell<ITableCellOptionsActionDelete>()
export class TableCellActionDelete extends BeanBase implements ITableCellRender {
  async checkVisible(_options: ITableCellOptionsActionDelete, _renderContext: IJsxRenderContextTableColumn): Promise<boolean> {
    return true;
  }

  render(options: ITableCellOptionsActionDelete, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    return (
      <button
        class={options.preset?.ActionDelete?.class ?? 'btn btn-outline btn-error join-item'}
        onClick={async () => {
          // eslint-disable-next-line no-alert
          if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
          const actionName = $jsx.normalizeAction('ActionDelete');
          await $host.$performAction(actionName, options.preset?.ActionDelete, renderContext);
        }}
      >
        <ZIcon name="::delete" width={24}></ZIcon>
      </button>
    );
  }
}
