import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';
import { currencyFormat } from '../lib/utils.js';

export interface ITableCellOptionsCurrency extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsCurrency>()
export class TableCellCurrency extends BeanBase implements ITableCellRender {
  render(renderContext: ITableCellRenderContext, _options: ITableCellOptionsCurrency, next: NextTableCellRender) {
    const { cellScope } = renderContext;
    const value = next();
    return currencyFormat(value, cellScope.property?.rest?.currency);
  }
}
