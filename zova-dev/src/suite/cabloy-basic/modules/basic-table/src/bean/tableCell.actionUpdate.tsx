import { classes } from 'typestyle';
import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceActionRowOptionsUpdate } from 'zova-module-basic-openapi';

export interface ITableCellOptionsActionUpdate extends IResourceActionRowOptionsUpdate {}

@TableCell<ITableCellOptionsActionUpdate>({
  class: 'btn btn-outline btn-primary join-item',
})
export class TableCellActionUpdate extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionUpdate, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    return (
      <button
        class={classes(options.class, $host.$style(options.style))}
        type="button"
        onClick={async () => {
          const actionName = $jsx.normalizeAction('ActionEdit');
          await $host.$performAction(actionName, options, renderContext);
        }}
      >
        <ZIcon name="::draft" width={24}></ZIcon>
      </button>
    );
  }
}
