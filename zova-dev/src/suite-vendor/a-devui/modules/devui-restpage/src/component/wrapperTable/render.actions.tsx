import { CellContext } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderActions extends BeanRenderBase {
  public renderActions(_props: CellContext<unknown, unknown>) {
    return <button>sss</button>;
  }
}
