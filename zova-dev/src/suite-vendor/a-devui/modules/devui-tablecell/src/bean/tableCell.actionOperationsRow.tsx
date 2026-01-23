import { BeanBase } from 'zova';
import { ZIcon } from 'zova-module-a-icon';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender, NextTableCellRender, TableCell } from 'zova-module-a-table';

export interface ITableCellOptionsActionOperationsRow extends IDecoratorTableCellOptions {}

@TableCell<ITableCellOptionsActionOperationsRow>()
export class TableCellActionOperationsRow extends BeanBase implements ITableCellRender {
  render(_options: ITableCellOptionsActionOperationsRow, renderContext: IJsxRenderContextTableCell, _next: NextTableCellRender) {
    const { $celScope, cellContext } = renderContext;
    return (
      <div class="flex gap-2">
        {$celScope.permissions?.row?.update && (
          <button
            class="btn btn-outline btn-primary"
            onClick={() => {
              // todo:
              const url = this.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
                params: { resource: $celScope.resource!, id: cellContext.row.id, formScene: 'edit' },
              });
              this.$router.push(url);
              // this.onActionRow('update', cellContext.row);
            }}
          >
            <ZIcon name="::draft"></ZIcon>
          </button>
        )}
        {$celScope.permissions?.row?.delete && (
          <button
            class="btn btn-outline btn-error"
            onClick={() => {
              // this.onActionDelete(cellContext.row);
            }}
          >
            <ZIcon name="::delete"></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
