import { classes } from 'typestyle';
import { BeanBase } from 'zova';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceTableCellOptionsDate } from 'zova-module-basic-openapi';

import { dateFormatUtil } from '../lib/utils.js';

export interface ITableCellOptionsDate extends IResourceTableCellOptionsDate {}

@TableCell<ITableCellOptionsDate>({
  preset: 'DATETIME_SHORT',
})
export class TableCellDate extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsDate, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $host } = renderContext;
    const value = dateFormatUtil(next(), options);
    if (!options.class || !options.style) return value;
    return <div class={classes(options.class, $host.$style(options.style))}>{value}</div>;
  }
}
