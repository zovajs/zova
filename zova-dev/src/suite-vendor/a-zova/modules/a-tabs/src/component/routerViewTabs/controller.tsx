import { RouterView } from '@cabloy/vue-router';
import { h, KeepAlive, Transition } from 'vue';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase, IRouterViewSlotParams, IRouteViewComponentMeta, pageRouteKey } from 'zova-module-a-router';
import { ModelTabs } from '../../model/tabs.js';
import { ModelTabsOptions } from '../../types/tabs.js';

export interface ControllerRouterViewTabsProps extends IRouterViewPropsBase {
  tabsOptions: ModelTabsOptions;
}

@Controller()
export class ControllerRouterViewTabs extends BeanRouterViewBase {
  static $propsDefault = {};

  @Use()
  $$modelTabs: ModelTabs;

  protected async __init__() {
    await this.$$modelTabs.initialize(this.$props.tabsOptions);
  }

  onRendered(componentMeta: IRouteViewComponentMeta, _component: IRouterViewSlotParams): void {
    this.$$modelTabs.addTab(componentMeta);
  }

  onKeepAliveInclude(): string[] | undefined {
    return this.$$modelTabs.keepAliveInclude;
  }

  protected render() {
    const slots = {
      default: component => {
        const componentMeta = this.prepareComponentMeta(component);
        return h(Transition, null, {
          default: () => {
            const vnode = h(component.Component, {
              key: componentMeta.componentKey,
            });
            cast(vnode).zovaHostProviders = { [pageRouteKey]: component.route };
            return [
              h(KeepAlive, {
                include: this.getKeepAliveInclude(),
              }, [vnode]),
            ];
          },
        });
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
