import { CurrencyOptions } from '@zhennann/currency';
import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { currencyFormat } from '../lib/utils.js';

export interface ITableCellOptionsCurrency extends IDecoratorTableCellOptions {
  currency?: CurrencyOptions;
}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsCurrency, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const value = next();
    return currencyFormat(value, options.currency);
  }
}
