import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionView>()
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(_renderContext: ITableCellRenderContext, _options: ITableCellOptionsActionView, next: NextTableCellRender): VNode | string {
    return next();
  }
}
