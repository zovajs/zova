import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { TableCellFormat } from '../lib/tableCellFormat.js';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat } from '../types/tableCellFormat.js';

export interface ITableCellFormatOptionsCurrency extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsCurrency>({ dependencies: 'a-table:fallback', match: '!!context.rest?.currency' })
export class TableCellFormatCurrency extends BeanBase implements ITableCellFormatRender {
  render(_props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsCurrency, next: NextTableCellFormat): VNode | string {
    return next();
  }
}
