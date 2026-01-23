import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';

@Render()
export class RenderActions<TData extends {} = {}> extends BeanRenderBase {
  public renderActions(cellContext: CellContext<TData, unknown>) {
    return (
      
    );
  }
}
