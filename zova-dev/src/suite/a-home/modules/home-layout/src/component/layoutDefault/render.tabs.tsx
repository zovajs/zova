import type { VNode } from 'vue';
import { withModifiers } from 'vue';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';
import { ZRouterViewTabs } from 'zova-module-a-tabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public render() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs: VNode[] = [];
    for (const tab of $$modelTabs.tabs) {
      const tabKey = tab.key;
      const className = tabKey === $$modelTabs.tabCurrentKey ? 'tab tab-active text-primary' : 'tab';
      const menuItem = this.$$modelMenu.findMenuItem({ link: tabKey });
      if (!menuItem) continue;
      const titleLocal = this.$text(menuItem?.title || '');
      const domTab = (
        <a
          key={tabKey}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            $$modelTabs.activeTab(tabKey);
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
                $$modelTabs.deleteTab(tabKey);
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
      <ZRouterViewTabs></ZRouterViewTabs>
    );
  }
}
