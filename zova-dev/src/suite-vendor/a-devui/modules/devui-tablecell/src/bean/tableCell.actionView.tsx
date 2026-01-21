import { BeanBase } from 'zova';
import { $performAction } from 'zova-module-a-action';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellOptions {
  resource?: string;
  id?: string;
}

@TableCell<ITableCellOptionsActionView>()
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const value = next();
    return (
      <a
        class="hover:text-blue-500"
        href="#"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          $performAction('rest-actions:view', options, renderContext);
        }}
      >
        {value}
      </a>
    );
  }
}
