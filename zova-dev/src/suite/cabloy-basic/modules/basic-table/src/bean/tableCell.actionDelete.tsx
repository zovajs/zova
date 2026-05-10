import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceActionRowOptionsDelete } from 'zova-module-basic-openapi';

declare module 'zova-module-a-openapi' {
  export interface IResourceTableCellActionRowRecord {
    ActionView?: IResourceActionRowOptionsView;
    ActionUpdate?: IResourceActionRowOptionsUpdate;
    ActionDelete?: IResourceActionRowOptionsDelete;
    ActionOperationsRow?: IResourceActionRowOptionsOperationsRow;
    ActionSubmit?: IResourceActionRowOptionsSubmit;
    ActionBack?: IResourceActionRowOptionsBack;
  }
}

export interface ITableCellOptionsActionDelete extends IResourceActionRowOptionsDelete {}

@TableCell<ITableCellOptionsActionDelete>({
  class: 'btn btn-outline btn-error join-item',
})
export class TableCellActionDelete extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionDelete, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $host } = renderContext;
    return (
      <button
        class={options.class}
        type="button"
        onClick={async () => {
          // eslint-disable-next-line no-alert
          if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
          await $host.$performAction('basic-actions:delete', options, renderContext);
        }}
      >
        <ZIcon name="::delete" width={24}></ZIcon>
      </button>
    );
  }
}
