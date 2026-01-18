import type { ModelTabs } from '../../model/tabs.js';
import { RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase, IRouteViewRouteMeta } from 'zova-module-a-router';

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
    this.$$modelTabs.forwardRoute(route);
    return true;
  }

  protected prepareRouteMeta(route: RouteLocationNormalizedLoadedGeneric): IRouteViewRouteMeta {
    return this.$$modelTabs.prepareRouteMeta(route);
  }

  protected getKeepAliveInclude(): string[] | undefined {
    return this.$$modelTabs.keepAliveInclude;
  }
}
