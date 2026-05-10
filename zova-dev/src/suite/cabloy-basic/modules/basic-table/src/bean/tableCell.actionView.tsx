import type { IResourceTableCellActionRowOptionsBase } from 'zova-module-a-openapi';

import { BeanBase } from 'zova';
import { type IJsxRenderContextTableCell, type ITableCellRender, type NextTableCellRender, TableCell } from 'zova-module-a-table';

declare module 'zova-module-a-openapi' {
  export interface IResourceTableCellActionRowRecord {
    'basic-table:actionView'?: ITableCellOptionsActionView;
  }
}

export interface ITableCellOptionsActionView extends IResourceTableCellActionRowOptionsBase {}

@TableCell<ITableCellOptionsActionView>({
  class: 'hover:text-blue-500',
})
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(options: ITableCellOptionsActionView, renderContext: IJsxRenderContextTableCell, next: NextTableCellRender) {
    const { $host } = renderContext;
    const value = next();
    return (
      <a
        class={options.class}
        href="#"
        onClick={async e => {
          e.preventDefault();
          e.stopPropagation();
          await $host.$performAction('basic-actions:view', options, renderContext);
        }}
      >
        {value}
      </a>
    );
  }
}
