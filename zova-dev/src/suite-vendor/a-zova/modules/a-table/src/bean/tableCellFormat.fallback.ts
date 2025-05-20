import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { TableCellFormat } from '../lib/tableCellFormat.js';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat } from '../types/tableCellFormat.js';

export interface ITableCellFormatOptionsFallback extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsFallback>()
export class TableCellFormatFallback extends BeanBase implements ITableCellFormatRender {
  render(_props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsFallback, next: NextTableCellFormat): VNode | string {
    return next();
  }
}
