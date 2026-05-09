import { CurrencyOptions } from '@zhennann/currency';
import { BeanBase } from 'zova';
import { IResourceTableCellOptionsBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

import { currencyFormat } from '../lib/utils.js';

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentTableCellRecord {
    'basic-currency:currency'?: ITableCellOptionsCurrency;
  }
}

export interface ITableCellOptionsCurrency extends IResourceTableCellOptionsBase, CurrencyOptions {}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsCurrency, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const value = currencyFormat(next(), options);
    if (!options.class) return value;
    return <div class={options.class}>{value}</div>;
  }
}
