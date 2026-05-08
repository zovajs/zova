import { BeanBase } from 'zova';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { IResourceTableCellOptionsCurrency } from 'zova-module-basic-openapi';

import { currencyFormat } from '../lib/utils.js';

export interface ITableCellOptionsCurrency extends IResourceTableCellOptionsCurrency {}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsCurrency, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const value = currencyFormat(next(), options);
    if (!options.class) return value;
    return <div class={options.class}>{value}</div>;
  }
}
