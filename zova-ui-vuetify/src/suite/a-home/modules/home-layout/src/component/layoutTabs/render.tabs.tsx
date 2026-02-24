import type { VNode } from 'vue';
import { withModifiers } from 'vue';
import { VBadge, VTab, VTabs } from 'vuetify/components';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';
import { ZRouterViewTabs } from 'zova-module-a-routertabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public renderTabs() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs: VNode[] = [];
    for (const tab of $$modelTabs.tabs) {
      const { tabKey, info } = tab;
      const className = tabKey === $$modelTabs.tabCurrentKey ? 'text-primary' : '';
      const titleLocal = this.$text(info?.title || '');
      const domTabContent = tab.affix
        ? titleLocal
        : (
            <VBadge
              class="hidden"
              color="surface"
              offsetX={-10}
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
              {titleLocal}
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
        >
          {!!info?.icon && <ZIcon name={info?.icon as any} width="24" height="24"></ZIcon>}
          {domTabContent}
        </VTab>
      );
      domTabs.push(domTab);
    }
    const domWrapper = (
      <VTabs
        alignTabs="start"
        centerActive
        modelValue={$$modelTabs.tabCurrentKey}
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

  public renderTabItems() {}

  _renderRouterViewTabs() {
    return (
      <ZRouterViewTabs></ZRouterViewTabs>
    );
  }
}
