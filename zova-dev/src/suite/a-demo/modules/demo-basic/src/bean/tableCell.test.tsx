import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsTest extends IDecoratorTableCellOptions {
  iconPrefix?: string;
}

@TableCell<ITableCellOptionsTest>()
export class TableCellTest extends BeanBase implements ITableCellRender {
  render(_renderContext: ITableCellRenderContext, options: ITableCellOptionsTest, next: NextTableCellRender): VNode | string {
    const value = next();
    const iconPrefix = options.iconPrefix;
    if (!iconPrefix) return value;
    return (
      <>
        <ZIcon name={iconPrefix as any}></ZIcon>
        {value}
      </>
    );
  }
}
