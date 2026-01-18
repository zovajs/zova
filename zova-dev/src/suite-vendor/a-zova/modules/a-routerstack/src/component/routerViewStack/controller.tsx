import type { ModelStack } from '../../model/stack.js';
import { RouteLocationNormalizedLoadedGeneric, RouterView } from '@cabloy/vue-router';
import { h, KeepAlive, Transition } from 'vue';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase, IRouterViewSlotParams, IRouteViewComponentMeta, pageRouteKey } from 'zova-module-a-router';

export interface ControllerRouterViewStackProps extends IRouterViewPropsBase {}

@Controller()
export class ControllerRouterViewStack extends BeanRouterViewBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'skipSelf' })
  $$modelStack: ModelStack;

  public backRoute(route: RouteLocationNormalizedLoadedGeneric) {
    this.$$modelStack.backRoute(route);
    return true;
  }

  public forwardRoute(route: RouteLocationNormalizedLoadedGeneric) {
    const componentMeta = this.prepareComponentMeta(route);
    this.$$modelStack.addTab(componentMeta);
    return true;
  }

  protected onKeepAliveInclude(): string[] | undefined {
    return this.$$modelStack.keepAliveInclude;
  }

  protected prepareComponentMeta(route: RouteLocationNormalizedLoadedGeneric): IRouteViewComponentMeta {
    // fullPath
    const fullPath = route.fullPath;
    // tab
    return { tabKey: fullPath, componentKey: fullPath, fullPath };
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
