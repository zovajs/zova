import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from '@cabloy/vue-router';

export function getRouteMatched(route: RouteLocationNormalizedLoaded): RouteLocationMatched {
  let match = route.matched.find(item => item.aliasOf);
  if (match) {
    match = match.aliasOf;
  } else {
    match = route.matched[route.matched.length - 1];
  }
  return match!;
}

export function getRealRouteName(name?: string | symbol | null): string | undefined {
  if (!name) return undefined;
  name = String(name);
  if (name.startsWith('$:')) return undefined;
  return name;
}

export function isRouterName(name?: string): boolean {
  return !!name && name.includes(':') && !name.includes('/');
}
