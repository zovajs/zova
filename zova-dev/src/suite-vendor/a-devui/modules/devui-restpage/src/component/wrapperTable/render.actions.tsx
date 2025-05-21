import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { icon, ZovaIcon } from 'zova-module-a-icon';

@Render()
export class RenderActions<T extends {} = {}> extends BeanRenderBase {
  public renderActions(props: CellContext<T, unknown>) {
    return (
      <div class="flex gap-2">
        <button class="btn btn-outline btn-primary">
          <ZovaIcon name={icon('::draft')} height={24}></ZovaIcon>
        </button>
        <button class="btn btn-outline btn-error">
          <ZovaIcon
            name={icon('::delete')}
            height={24}
            onClick={() => {
              this.onActionRow('update', props.row);
            }}
          ></ZovaIcon>
        </button>
      </div>
    );
  }
}
