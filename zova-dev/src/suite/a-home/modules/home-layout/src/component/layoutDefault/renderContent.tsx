import { BeanRenderBase, Use } from 'zova';
import { Local } from 'zova-module-a-bean';
import { StyleLayoutDefault } from './style.js';
import type { RenderLayoutDefault } from './render.jsx';

export interface RenderContent extends StyleLayoutDefault {}

@Local()
export class RenderContent extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutDefault;

  public render() {
    return this.$$r.$$renderTabs._renderRouterViewTabs();
  }
}
