import type { VNode } from 'vue';

import { withModifiers } from 'vue';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { $iconName, ZIcon } from 'zova-module-a-icon';
import { RouteTab, ZRouterViewTabs } from 'zova-module-a-routertabs';

@Render()
export class RenderTabs extends BeanRenderBase {
  public renderTabs() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs: VNode[] = [];
    for (const tab of $$modelTabs.tabs) {
      const { tabKey, info } = tab;
      const className = tabKey === $$modelTabs.tabKeyCurrent ? 'tab tab-active text-primary' : 'tab';
      const titleLocale = this.$text(info?.title || '');
      const tabIcon = this.getTabIcon(tab);
      const domTab = (
        <a
          key={tabKey}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            $$modelTabs.activeTab(tabKey);
          }}
        >
          {!!info?.icon && <ZIcon name={tabIcon as any} width="24" height="24"></ZIcon>}
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

  public getTabIcon(tab: RouteTab) {
    const { info, items } = tab;
    // pageDirty
    const hasPageDirty = items && items.some(item => !!item.pageMeta?.pageDirty);
    if (hasPageDirty) return $iconName('::asterisk');
    // default
    return info?.icon ? info?.icon : '';
  }

  public renderTabItems() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const tabCurrent = $$modelTabs.tabCurrent;
    if (!tabCurrent || !tabCurrent.items) return;
    const tabKey = tabCurrent.tabKey;
    const domTabs: VNode[] = [];
    for (const tabItem of tabCurrent.items) {
      // ignore first
      if (tabItem.componentKey === tabKey) continue;
      const { componentKey, pageMeta } = tabItem;
      const className = componentKey === $$modelTabs.componentKeyCurrent ? 'text-secondary' : '';
      const pageTitle = pageMeta?.pageTitle || '--';
      const domTab = (
        <a
          key={componentKey}
          role="tab"
          class={`${className} ${this.cTab}`}
          onClick={() => {
            $$modelTabs.activeTabItem(tabKey, componentKey);
          }}
        >
          {pageMeta?.pageDirty && <ZIcon name={'::asterisk'} width="24" height="24"></ZIcon>}
          <div class="text-truncate" style={{ maxWidth: this.scope.config.tabItem.maxWidth }}>
            {pageTitle}
          </div>
          <ZIcon
            class="tab-close hidden hover:bg-slate-400 rounded-sm"
            name="::close"
            width="16"
            height="16"
            nativeOnClick={withModifiers(() => {
              $$modelTabs.deleteTabItem(tabKey, componentKey, false);
            }, ['stop'])}
          ></ZIcon>
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
