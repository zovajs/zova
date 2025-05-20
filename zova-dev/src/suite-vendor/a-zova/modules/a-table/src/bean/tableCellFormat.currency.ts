import { CellContext } from '@tanstack/table-core';
import { Currency } from '@zhennann/currency';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { TableCellFormat } from '../lib/tableCellFormat.js';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat } from '../types/tableCellFormat.js';

export interface ITableCellFormatOptionsCurrency extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsCurrency>({ dependencies: 'a-table:fallback', match: '!!context.rest?.currency' })
export class TableCellFormatCurrency extends BeanBase implements ITableCellFormatRender {
  render(props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsCurrency, next: NextTableCellFormat): VNode | string {
    const value = next();
    if (!value || (typeof value !== 'number' && typeof value !== 'string')) return value;
    const currency = new Currency(props.cell.property?.rest?.currency);
    return currency.format(value);
  }
}
