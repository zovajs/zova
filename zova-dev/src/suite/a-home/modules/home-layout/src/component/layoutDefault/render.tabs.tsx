import type { VNode } from 'vue';
import { withModifiers } from 'vue';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';
import { IRouteViewComponentMeta } from 'zova-module-a-router';
import { ZRouterViewTabs } from 'zova-module-a-tabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public render() {
    const domTabs: VNode[] = [];
    for (const tab of this.$$modelTabs.tabs) {
      const tabKey = tab.key;
      const className = tabKey === this.$$modelTabs.tabCurrentKey ? 'tab tab-active text-primary' : 'tab';
      const menuItem = this.$$modelMenu.findMenuItem({ link: tabKey });
      if (!menuItem) continue;
      const titleLocal = this.$text(menuItem?.title || '');
      const domTab = (
        <a
          key={tabKey}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            this.$$modelTabs.activeTab(tabKey);
          }}
        >
          {!!menuItem?.icon && <ZIcon name={menuItem?.icon as any} width="24" height="24"></ZIcon>}
          {titleLocal}
          {!tab.affix && (
            <ZIcon
              class="tab-close hidden hover:bg-slate-400 rounded-sm"
              name="::close"
              width="16"
              height="16"
              nativeOnClick={withModifiers(() => {
                this.$$modelTabs.deleteTab(tabKey);
              }, ['stop'])}
            >
            </ZIcon>
          )}
        </a>
      );
      domTabs.push(domTab);
    }
    return (
      <ClientOnly>
        <div role="tablist" class="tabs tabs-lifted">
          {domTabs}
        </div>
      </ClientOnly>
    );
  }

  _renderRouterViewTabs() {
    return (
      <ZRouterViewTabs
        onRendered={(componentMeta: IRouteViewComponentMeta) => {
          this.$$modelTabs.addTab(componentMeta);
        }}
        onKeepAliveInclude={() => {
          return this.$$modelTabs.keepAliveInclude;
        }}
      ></ZRouterViewTabs>
    );
  }
}
