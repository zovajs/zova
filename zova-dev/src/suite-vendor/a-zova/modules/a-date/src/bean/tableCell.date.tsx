import { BeanBase } from 'zova';
import {
  IDecoratorTableCellPresetOptions,
  IJsxRenderContextTableCell,
  ITableCellRender,
  NextTableCellRender,
  TableCell,
} from 'zova-module-a-table';

import { dateFormatUtil } from '../lib/utils.js';

export interface ITableCellOptionsDate extends IDecoratorTableCellPresetOptions {}

@TableCell<ITableCellOptionsDate>({
  preset: {
    date: { preset: 'DATETIME_SHORT' },
  },
})
export class TableCellDate extends BeanBase implements ITableCellRender {
  render(
    options: ITableCellOptionsDate,
    _renderContext: IJsxRenderContextTableCell,
    next: NextTableCellRender,
  ) {
    const value = next();
    return dateFormatUtil(value, options.preset?.date);
  }
}
