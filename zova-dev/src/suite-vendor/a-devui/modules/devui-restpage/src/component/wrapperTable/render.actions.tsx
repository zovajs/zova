import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';

@Render()
export class RenderActions<T extends {} = {}> extends BeanRenderBase {
  public renderActions(props: CellContext<T, unknown>) {
    return (
      <div class="flex gap-2">
        {this.$$restResource.permissions?.row?.update && (
          <button
            class="btn btn-outline btn-primary"
            onClick={() => {
              this.onActionRow('update', props.row);
            }}
          >
            <ZIcon name="::draft"></ZIcon>
          </button>
        )}
        {this.$$restResource.permissions?.row?.delete && (
          <button
            class="btn btn-outline btn-error"
            onClick={() => {
              this.onActionRow('delete', props.row);
            }}
          >
            <ZIcon name="::delete"></ZIcon>
          </button>
        )}
      </div>
    );
  }
}
