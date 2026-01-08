import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsDate extends IDecoratorTableCellOptions {
  dateFormat?:
}

@TableCell<ITableCellOptionsDate>()
export class TableCellDate extends BeanBase implements ITableCellRender {
  render(_renderContext: ITableCellRenderContext, _options: ITableCellOptionsDate, next: NextTableCellRender) {
    return next();
  }
}
