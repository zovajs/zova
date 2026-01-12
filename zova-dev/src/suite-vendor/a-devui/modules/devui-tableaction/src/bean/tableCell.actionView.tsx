import { BeanBase } from 'zova';
import { IDecoratorTableCellOptions, ITableCellRender, ITableCellRenderContext, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionView extends IDecoratorTableCellOptions {
  openTarget: 'popup' | 'page';
}

@TableCell<ITableCellOptionsActionView>({
  openTarget: 'popup',
})
export class TableCellActionView extends BeanBase implements ITableCellRender {
  render(renderContext: ITableCellRenderContext, options: ITableCellOptionsActionView, next: NextTableCellRender) {
    const { $$table, cellContext } = renderContext;
    const value = next();
    return (
      <a
        class="hover:text-blue-500"
        href="#"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (options.openTarget === 'page') {
            const url = $$table.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
              params: { resource: 'test-rest:product', id: cellContext.row.id },
            });
            $$table.$router.push(url);
          } else {
            $$table.onActionRow('view', cellContext.row);
          }
        }}
      >
        {value}
      </a>
    );
  }
}
