import type { RouteLocationMatched, RouteLocationNormalizedLoaded, RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import type { ZovaContext } from 'zova';
import { routerViewLocationKey } from '@cabloy/vue-router';
import { inject } from 'vue';
import { pageRouteKey } from './const.js';

export function getRouteMatched(route: RouteLocationNormalizedLoaded): RouteLocationMatched | undefined {
  let match = route.matched.find(item => item.aliasOf);
  if (match) {
    match = match.aliasOf;
  } else {
    match = route.matched[route.matched.length - 1];
  }
  return match;
}

export function getRealRouteName(name?: string | symbol | null): string | undefined {
  if (!name) return undefined;
  name = String(name);
  if (name.startsWith('$:')) return undefined;
  return name;
}

export function isRouterName(name?: string | null | undefined): boolean {
  return !!name && name.includes(':') && !name.includes('/');
}

export function getPageRoute(ctx: ZovaContext): RouteLocationNormalizedLoadedGeneric | undefined {
  let route = ctx.bean._getBeanFromHost({ name: pageRouteKey });
  if (!route) {
    route = ctx.util.instanceScope(() => {
      return inject(routerViewLocationKey)?.value;
    });
  }
  return route as RouteLocationNormalizedLoadedGeneric | undefined;
}
