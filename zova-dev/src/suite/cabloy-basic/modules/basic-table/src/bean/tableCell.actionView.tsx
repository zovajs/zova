import { classes } from 'typestyle';
import { BeanBase } from 'zova';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceActionRowOptionsView } from 'zova-module-basic-openapi';

export interface ITableCellOptionsActionView extends IResourceActionRowOptionsView {}

@TableCell<ITableCellOptionsActionView>({
  class: 'hover:text-blue-500',
})
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $jsx, $host } = renderContext;
    const value = next();
    return (
      <a
        class={classes(options.class, $host.$style(options.style))}
        href="#"
        onClick={async e => {
          e.preventDefault();
          e.stopPropagation();
          const actionName = $jsx.normalizeAction('ActionView');
          await $host.$performAction(actionName, options, renderContext);
        }}
      >
        {value}
      </a>
    );
  }
}
