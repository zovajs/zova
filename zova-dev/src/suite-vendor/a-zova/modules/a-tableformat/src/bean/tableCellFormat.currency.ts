import { CellContext } from '@tanstack/table-core';
import { Currency } from '@zhennann/currency';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat, TableCellFormat } from 'zova-module-a-table';

export interface ITableCellFormatOptionsCurrency extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsCurrency>({ match: '!!context.rest?.currency' })
export class TableCellFormatCurrency extends BeanBase implements ITableCellFormatRender {
  render(props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsCurrency, next: NextTableCellFormat): VNode | string {
    const value = next();
    if (!value || (typeof value !== 'number' && typeof value !== 'string')) return value;
    const currency = new Currency(props.cell.property?.rest?.currency);
    return currency.format(value);
  }
}
