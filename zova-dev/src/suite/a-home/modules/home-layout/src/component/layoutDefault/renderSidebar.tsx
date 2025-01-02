import { BeanRenderBase, Use } from 'zova';
import { Local } from 'zova-module-a-bean';
import { StyleLayoutDefault } from './style.js';
import type { RenderLayoutDefault } from './render.jsx';

export interface RenderSidebar extends StyleLayoutDefault {}

@Local()
export class RenderSidebar extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutDefault;

  render() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$r.$$renderMenu.render()}
      </div>
    );
  }
}
