import type { RenderLayoutTabs } from './render.jsx';
import { VNavigationDrawer } from 'vuetify/components';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderSidebar extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    return (
      <VNavigationDrawer
        v-model={this.leftDrawerOpen}
        mobileBreakpoint={this.sys.config.layout.sidebar.breakpoint}
        width={this.layoutConfig.sidebar.width}
      >
        {this.$$r.$$renderMenu.render()}
      </VNavigationDrawer>
    );
  }
}
