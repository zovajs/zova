import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableCellFormatOptions, ITableCellFormatRender, NextTableCellFormat, TableCellFormat } from 'zova-module-a-table';

export interface ITableCellFormatOptionsActionView extends IDecoratorTableCellFormatOptions {}

@TableCellFormat<ITableCellFormatOptionsActionView>({ type: 'vnode', match: 'context.rest?.render==="actionView"' })
export class TableCellFormatActionView extends BeanBase implements ITableCellFormatRender {
  render(_props: CellContext<{}, unknown>, _options: ITableCellFormatOptionsActionView, next: NextTableCellFormat): VNode | string {
    return 'actionView';
    return next();
  }
}
