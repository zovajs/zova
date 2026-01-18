import type { RouteLocationNormalizedLoaded, RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import type { IRouterViewSlotParams, IRouteViewComponentMeta } from '../types/routerView.js';
import { RouterView } from '@cabloy/vue-router';
import { h, KeepAlive, Transition } from 'vue';
import { BeanControllerBase, cast } from 'zova';
import { pageRouteKey, routerViewKey } from './const.js';

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

  protected getKeepAliveInclude(): string[] | undefined {
    throw new Error('Not Implemented');
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
