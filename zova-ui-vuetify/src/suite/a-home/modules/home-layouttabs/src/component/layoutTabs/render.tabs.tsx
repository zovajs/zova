import type { VNode } from 'vue';
import { withModifiers } from 'vue';
import { VBadge, VTab, VTabs } from 'vuetify/components';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';
import { RouteTab, ZRouterViewTabs } from 'zova-module-a-routertabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public renderTabs() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs: VNode[] = [];
    for (const tab of $$modelTabs.tabs) {
      const { tabKey, info } = tab;
      const className = tabKey === $$modelTabs.tabKeyCurrent ? 'text-primary' : '';
      const titleLocale = this.$text(info?.title || '');
      const tabIcon = this.getTabIcon(tab);
      const domTabContent = tab.affix
        ? titleLocale
        : (
            <VBadge
              class="hidden"
              color="surface"
              offsetX={tabIcon ? 2 : -10}
              offsetY={-8}
              v-slots={{
                badge: () => (
                  <ZIcon
                    name="::close"
                    width="16"
                    height="16"
                    nativeOnClick={withModifiers(() => {
                      $$modelTabs.deleteTab(tabKey);
                    }, ['stop'])}
                  >
                  </ZIcon>
                ),
              }}
            >
              {titleLocale}
            </VBadge>
          );
      const domTab = (
        <VTab
          key={tabKey}
          value={tabKey}
          class={`${className} ${this.cTab}`}
          nativeOnClick={() => {
            $$modelTabs.activeTab(tabKey);
          }}
          prependIcon={this.getTabIcon(tab)}
        >
          {domTabContent}
        </VTab>
      );
      domTabs.push(domTab);
    }
    const domWrapper = (
      <VTabs
        alignTabs="start"
        centerActive
        modelValue={$$modelTabs.tabKeyCurrent}
        mandatory={false}
      >
        {domTabs}
      </VTabs>
    );
    if (!this.$$modelTabs.cache) return domWrapper;
    return (
      <ClientOnly>
        {domWrapper}
      </ClientOnly>
    );
  }

  public getTabIcon(tab: RouteTab) {
    const { info } = tab;
    return info?.icon ? info?.icon : '';
  }

  public renderTabItems() {}

  _renderRouterViewTabs() {
    return (
      <ZRouterViewTabs></ZRouterViewTabs>
    );
  }
}
