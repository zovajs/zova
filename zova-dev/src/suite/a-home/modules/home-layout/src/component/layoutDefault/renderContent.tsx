import { BeanRenderBase, Local, Use } from 'zova';
import { StyleLayoutDefault } from './style.js';
import type { RenderLayoutDefault } from './render.jsx';

export interface RenderContent extends StyleLayoutDefault {}

@Local()
export class RenderContent extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutDefault;

  render() {
    return this.$$r.$$renderTabs._renderRouterViewTabs();
  }
}
