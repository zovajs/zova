import { BeanBase } from 'zova';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceActionRowOptionsView } from 'zova-module-basic-openapi';

export interface ITableCellOptionsActionView extends IResourceActionRowOptionsView {}

@TableCell<ITableCellOptionsActionView>({
  class: 'hover:text-blue-500',
})
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $host } = renderContext;
    const value = next();
    return (
      <a
        class={options.class}
        href="#"
        onClick={async e => {
          e.preventDefault();
          e.stopPropagation();
          await $host.$performAction('basic-actions:view', options, renderContext);
        }}
      >
        {value}
      </a>
    );
  }
}
