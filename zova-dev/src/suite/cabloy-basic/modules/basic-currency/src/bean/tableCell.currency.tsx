import { classes } from 'typestyle';
import { BeanBase } from 'zova';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceTableCellOptionsCurrency } from 'zova-module-basic-openapi';

import { currencyFormat } from '../lib/utils.js';

export interface ITableCellOptionsCurrency extends IResourceTableCellOptionsCurrency {}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsCurrency, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $host } = renderContext;
    const value = currencyFormat(next(), options);
    if (!options.class || !options.style) return value;
    return <div class={classes(options.class, $host.$style(options.style))}>{value}</div>;
  }
}
