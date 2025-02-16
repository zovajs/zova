import type { RenderLayoutDefault } from './render.jsx';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderContent extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutDefault;

  public render() {
    return this.$$r.$$renderTabs._renderRouterViewTabs();
  }
}
