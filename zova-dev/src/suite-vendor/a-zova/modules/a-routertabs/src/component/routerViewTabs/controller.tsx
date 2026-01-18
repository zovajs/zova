import type { ModelTabs } from '../../model/tabs.js';
import { RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanRouterViewBase, IRouterViewPropsBase } from 'zova-module-a-router';

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

  protected getKeepAliveInclude(): string[] | undefined {
    return this.$$modelTabs.keepAliveInclude;
  }
}
