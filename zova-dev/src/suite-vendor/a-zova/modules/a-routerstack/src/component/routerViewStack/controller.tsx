import type { ModelStack } from '../../model/stack.js';
import { RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase, IRouteViewComponentMeta } from 'zova-module-a-router';

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

  protected getKeepAliveInclude(): string[] | undefined {
    return this.$$modelStack.keepAliveInclude;
  }

  protected prepareComponentMeta(route: RouteLocationNormalizedLoadedGeneric): IRouteViewComponentMeta {
    // fullPath
    const fullPath = route.fullPath;
    // tab
    return { tabKey: fullPath, componentKey: fullPath, fullPath };
  }
}
