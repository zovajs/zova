import { CurrencyOptions } from '@zhennann/currency';
import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { currencyFormat } from '../lib/utils.js';

export interface ITableCellOptionsCurrency extends IDecoratorTableCellOptions {
  currency?: CurrencyOptions;
}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsCurrency, _renderContext: ITableCellRenderContext, next: NextTableCellRender) {
    const value = next();
    return currencyFormat(value, options.currency);
  }
}
