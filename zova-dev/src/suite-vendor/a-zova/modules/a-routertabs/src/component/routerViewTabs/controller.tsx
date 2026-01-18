import type { ModelTabs } from '../../model/tabs.js';
import { RouteLocationNormalizedLoadedGeneric, RouterView } from '@cabloy/vue-router';
import { h, KeepAlive, Transition } from 'vue';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase, IRouterViewSlotParams, IRouteViewComponentMeta, pageRouteKey } from 'zova-module-a-router';

export interface ControllerRouterViewTabsProps extends IRouterViewPropsBase {}

@Controller()
export class ControllerRouterViewTabs extends BeanRouterViewBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'skipSelf' })
  $$modelTabs: ModelTabs;

  public backRoute(route: RouteLocationNormalizedLoadedGeneric) {
    this.$$modelTabs.backRoute(route);
    return true;
  }

  public forwardRoute(route: RouteLocationNormalizedLoadedGeneric) {
    const componentMeta = this.prepareComponentMeta(route);
    this.$$modelTabs.addTab(componentMeta);
    return true;
  }

  protected onKeepAliveInclude(): string[] | undefined {
    return this.$$modelTabs.keepAliveInclude;
  }

  protected render() {
    const slots = {
      default: (component: IRouterViewSlotParams) => {
        const componentMeta = this.prepareComponentMeta(component.route);
        return h(Transition, null, {
          default: () => {
            const vnode = h(component.Component as any, {
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
