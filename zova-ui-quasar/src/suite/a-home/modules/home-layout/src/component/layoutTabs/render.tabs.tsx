import type { VNode } from 'vue';

import { withModifiers } from 'vue';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZIcon } from 'zova-module-a-icon';
import { ZRouterViewTabs } from 'zova-module-a-routertabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public render() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs: VNode[] = [];
    for (const tab of $$modelTabs.tabs) {
      const { tabKey, info } = tab;
      const className = tabKey === $$modelTabs.tabKeyCurrent ? 'tab tab-active text-primary' : 'tab';
      const titleLocale = this.$text(info?.title || '');
      const domTab = (
        <a
          key={tabKey}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            $$modelTabs.activeTab(tabKey);
          }}
        >
          {!!info?.icon && <ZIcon name={info?.icon as any} width="24" height="24"></ZIcon>}
          {titleLocale}
          {!tab.affix && (
            <ZIcon
              class="tab-close hidden hover:bg-slate-400 rounded-sm"
              name="::close"
              width="16"
              height="16"
              nativeOnClick={withModifiers(() => {
                $$modelTabs.deleteTab(tabKey);
              }, ['stop'])}
            ></ZIcon>
          )}
        </a>
      );
      domTabs.push(domTab);
    }
    const domWrapper = (
      <div role="tablist" class="tabs tabs-lifted">
        {domTabs}
      </div>
    );
    if (!this.$$modelTabs.cache) return domWrapper;
    return <ClientOnly>{domWrapper}</ClientOnly>;
  }

  _renderRouterViewTabs() {
    return <ZRouterViewTabs></ZRouterViewTabs>;
  }
}
