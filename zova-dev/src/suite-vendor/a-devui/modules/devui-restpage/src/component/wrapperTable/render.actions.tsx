import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';

@Render()
export class RenderActions<TData extends {} = {}> extends BeanRenderBase {
  public renderActions(props: CellContext<TData, unknown>) {
    return (
      <div class="flex gap-2">
        {this.$$modelResource.permissions?.row?.update && (
          <button
            class="btn btn-outline btn-primary"
            onClick={() => {
              this.onActionRow('update', props.row);
            }}
          >
            <ZIcon name="::draft"></ZIcon>
          </button>
        )}
        {this.$$modelResource.permissions?.row?.delete && (
          <button
            class="btn btn-outline btn-error"
            onClick={() => {
              this.onActionDelete(props.row);
            }}
          >
            <ZIcon name="::delete"></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
