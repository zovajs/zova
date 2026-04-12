import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsTest extends IDecoratorTableCellOptions {
  iconPrefix?: string;
}

@TableCell<ITableCellOptionsTest>({
  iconPrefix: '::home',
})
export class TableCellTest extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsTest, _renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const value = next();
    const iconPrefix = options.iconPrefix;
    if (!iconPrefix) return value;
    return (
      <div>
        <ZIcon name={iconPrefix as any} width={24}></ZIcon>
        <span>{value}</span>
      </div>
    );
  }
}
