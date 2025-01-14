import { BeanRenderBase, ClientOnly, ZovaIcon, icon } from 'zova';
import { __ThisModule__ } from '../../.metadata/this.js';
import { VNode, withModifiers } from 'vue';
import { ZRouterViewTabs } from 'zova-module-a-tabs';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderTabs extends BeanRenderBase {
  public render() {
    const domTabs: VNode[] = [];
    for (const tab of this.$$modelTabs.tabs) {
      const className = tab.key === this.$$modelTabs.tabCurrentKey ? 'tab tab-active text-primary' : 'tab';
      const menuItem = this.$$modelMenu.findMenuItem(tab.key);
      if (!menuItem) continue;
      const titleLocal = this.$text(menuItem?.title || '');
      const domTab = (
        <a
          key={tab.key}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            this.$$modelTabs.activeTab(tab);
          }}
        >
          {!!menuItem?.icon && <ZovaIcon name={menuItem?.icon} width="24" height="24"></ZovaIcon>}
          {titleLocal}
          {!tab.affix && (
            <ZovaIcon
              class="tab-close hidden hover:bg-slate-400 rounded"
              name={icon('::close')}
              width="16"
              height="16"
              onClick={withModifiers(() => {
                this.$$modelTabs.deleteTab(tab);
              }, ['stop'])}
            ></ZovaIcon>
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
    return <ZRouterViewTabs></ZRouterViewTabs>;
  }
}
