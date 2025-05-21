import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat, TableCellFormat } from 'zova-module-a-table';

export interface ITableCellFormatOptionsFallback extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsFallback>()
export class TableCellFormatFallback extends BeanBase implements ITableCellFormatRender {
  render(props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsFallback, next: NextTableCellFormat): VNode | string {
    const res = next();
    if (res === undefined || res === null) return props.table.options.renderFallbackValue;
    return res;
  }
}
