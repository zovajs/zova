import { BeanRenderBase, Use } from 'zova';
import type { RenderLayoutDefault } from './render.jsx';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderSidebar extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutDefault;

  public render() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$r.$$renderMenu.render()}
      </div>
    );
  }
}
