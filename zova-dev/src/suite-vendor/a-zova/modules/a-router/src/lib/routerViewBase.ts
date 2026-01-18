import type { RouteLocationNormalizedLoaded, RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import type { IRouteViewComponentMeta } from '../types/routerView.js';
import { BeanControllerBase } from 'zova';
import { routerViewKey } from './const.js';

export interface IRouterViewPropsBase {}

export class BeanRouterViewBase extends BeanControllerBase implements IRouterViewPropsBase {
  protected async __init__() {
    this.bean._setBean(routerViewKey, this);
    this.$router.addRouterView(this);
  }

  protected __dispose__() {
    this.$router.removeRouterView(this);
  }

  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value.call(this.app, route);
    }
    return value;
  }

  private __handleRoutePropComponentKey(route: RouteLocationNormalizedLoaded) {
    const componentKey = this._handleRouteProp(route, 'componentKey');
    if (componentKey) return componentKey;
    // name
    const name = this.$router.getRealRouteName(route.name);
    // path
    if (!name) return route.path;
    // name: nameOnly
    if (route.meta.componentKeyMode === 'nameOnly') return name;
    // name: withParams
    return route.path;
  }

  public backRoute(_route: RouteLocationNormalizedLoadedGeneric) {
    return false;
  }

  public forwardRoute(_route: RouteLocationNormalizedLoadedGeneric) {
    return false;
  }

  protected prepareComponentMeta(route: RouteLocationNormalizedLoadedGeneric): IRouteViewComponentMeta {
    // fullPath
    const fullPath = route.fullPath;
    // componentKey
    const componentKey = this.__handleRoutePropComponentKey(route);
    // tabKey
    const tabKey = this._handleRouteProp(route, 'tabKey') || componentKey;
    // keepAlive
    const keepAlive = this._handleRouteProp(route, 'keepAlive');
    // tab
    return { tabKey, componentKey, fullPath, keepAlive };
  }

  protected getKeepAliveInclude() {
    return this.onKeepAliveInclude();
  }

  protected onKeepAliveInclude(): string[] | undefined {
    throw new Error('Not Implemented');
  }
}
