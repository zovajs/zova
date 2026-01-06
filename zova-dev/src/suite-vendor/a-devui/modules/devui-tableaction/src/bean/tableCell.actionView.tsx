import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionView>()
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(renderContext: ITableCellRenderContext, _options: ITableCellOptionsActionView, next: NextTableCellRender) {
    const { $$table, cellContext } = renderContext;
    const value = next();
    return (
      <a
        class="hover:text-blue-500"
        href="#"
        onClick={e => {
          e.stopPropagation();
          $$table.onActionRow('view', cellContext.row);
        }}
      >
        {value}
      </a>
    );
  }
}
