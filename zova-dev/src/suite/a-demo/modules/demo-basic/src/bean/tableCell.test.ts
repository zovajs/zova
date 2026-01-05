import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsTest extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsTest>()
export class TableCellTest extends BeanBase implements ITableCellRender {
  render(_renderContext: ITableCellRenderContext, _options: ITableCellOptionsTest, next: NextTableCellRender): VNode | string {
    return next();
  }
}
