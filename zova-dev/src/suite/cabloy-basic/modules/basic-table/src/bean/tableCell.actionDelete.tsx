import { classes } from 'typestyle';
import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceActionRowOptionsDelete } from 'zova-module-basic-openapi';

export interface ITableCellOptionsActionDelete extends IResourceActionRowOptionsDelete {}

@TableCell<ITableCellOptionsActionDelete>({
  class: 'btn btn-outline btn-error join-item',
})
export class TableCellActionDelete extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionDelete, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    return (
      <button
        class={classes(options.class, $host.$style(options.style))}
        type="button"
        onClick={async () => {
          // eslint-disable-next-line no-alert
          if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
          const actionName = $jsx.normalizeAction('ActionDelete');
          await $host.$performAction(actionName, options, renderContext);
        }}
      >
        <ZIcon name="::delete" width={24}></ZIcon>
      </button>
    );
  }
}
