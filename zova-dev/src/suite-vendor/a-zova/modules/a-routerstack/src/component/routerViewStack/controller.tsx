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

  public async backRoute(route: RouteLocationNormalizedLoadedGeneric) {
    return await this.$$modelStack.backRoute(route);
  }

  protected onRender(componentMeta: IRouteViewComponentMeta): void {
    this.$$modelStack.addTab(componentMeta);
  }

  protected onKeepAliveInclude(): string[] | undefined {
    return this.$$modelStack.keepAliveInclude;
  }

  protected prepareComponentMeta(component: IRouterViewSlotParams): IRouteViewComponentMeta {
    // fullPath
    const fullPath = component.route.fullPath;
    // tab
    const componentMeta: IRouteViewComponentMeta = { tabKey: fullPath, componentKey: fullPath, fullPath };
    // onRender
    this.onRender(componentMeta);
    return componentMeta;
  }

  protected render() {
    const slots = {
      default: (component: IRouterViewSlotParams) => {
        const componentMeta = this.prepareComponentMeta(component);
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
