import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

import type { RenderLayoutTabs } from './render.jsx';

@Render()
export class RenderSidebar extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$r.$$renderMenu.render()}
      </div>
    );
  }
}
