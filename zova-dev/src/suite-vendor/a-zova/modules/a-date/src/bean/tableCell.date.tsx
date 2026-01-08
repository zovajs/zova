import { DateTime } from 'luxon';
import { BeanBase } from 'zova';
import { TypeDateFormat } from 'zova-module-a-openapi';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsDate extends IDecoratorTableCellOptions {
  dateFormat?: TypeDateFormat;
}

@TableCell<ITableCellOptionsDate>({
  dateFormat: { preset: 'DATETIME_SHORT' },
})
export class TableCellDate extends BeanBase implements ITableCellRender {
  render(_renderContext: ITableCellRenderContext, options: ITableCellOptionsDate, next: NextTableCellRender) {
    const value = next();
    if (!value) return;
    const dateFormat = options.dateFormat;
    if (!dateFormat) return value;
    const datetime = DateTime.fromJSDate(value);
    if (typeof dateFormat === 'string') {
      return datetime.toFormat(dateFormat);
    } else if (typeof dateFormat === 'object' && dateFormat.preset) {
      return datetime.toLocaleString(DateTime[dateFormat.preset]);
    }
    return value;
  }
}
