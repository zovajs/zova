import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionView>()
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(renderContext: ITableCellRenderContext, _options: ITableCellOptionsActionView, next: NextTableCellRender) {
    const { $$table, cellContext, cellScope } = renderContext;
    const value = next();
    return (
      <a
        class="hover:text-blue-500"
        href="#"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          const url = $$table.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
            params: { resource: cellScope.resource!, id: cellContext.row.id },
          });
          $$table.$router.push(url);
        }}
      >
        {value}
      </a>
    );
  }
}
