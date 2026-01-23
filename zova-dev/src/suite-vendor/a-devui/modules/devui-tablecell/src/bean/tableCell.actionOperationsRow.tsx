import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionOperationsRow extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionOperationsRow>()
export class TableCellActionOperationsRow extends BeanBase implements ITableCellRender {
  render(_options: ITableCellOptionsActionOperationsRow, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    return next();
  }
}
