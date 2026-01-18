import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';

@Render()
export class RenderActions<TData extends {} = {}> extends BeanRenderBase {
  public renderActions(cellContext: CellContext<TData, unknown>) {
    return (
      <div class="flex gap-2">
        {this.$$modelResource.permissions?.row?.update && (
          <button
            class="btn btn-outline btn-primary"
            onClick={() => {
              // todo:
              const url = this.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
                params: { resource: this.tableScope.resource!, id: cellContext.row.id, formScene: 'edit' },
              });
              this.$router.push(url);
              // this.onActionRow('update', cellContext.row);
            }}
          >
            <ZIcon name="::draft"></ZIcon>
          </button>
        )}
        {this.$$modelResource.permissions?.row?.delete && (
          <button
            class="btn btn-outline btn-error"
            onClick={() => {
              this.onActionDelete(cellContext.row);
            }}
          >
            <ZIcon name="::delete"></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
