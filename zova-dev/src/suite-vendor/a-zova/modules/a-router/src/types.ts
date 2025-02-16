import type { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
// @ts-ignore ignore
import type { IPageNameRecord, IPagePathRecord, TypeComponentLayoutRecord, TypePageSchemas } from 'zova';
import type { BeanRouter } from './bean/bean.router.js';

import 'vue-router';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

declare module 'vue-router' {
  interface RouteMeta {
    absolute?: boolean;
    layout?: keyof TypeComponentLayoutRecord | 'empty' | 'default' | false | IModuleRouteComponent;
    requiresAuth?: boolean;
    name?: string;
    componentKey?: ((route: RouteLocationNormalizedLoaded) => string) | string;
    tabKey?: ((route: RouteLocationNormalizedLoaded) => string) | string;
    keepAlive?: ((route: RouteLocationNormalizedLoaded) => boolean) | boolean;
  }
}

declare module 'zova' {
  export interface BeanBase {
    $router: BeanRouter;
  }

  export interface IModuleResource {
    routes: IModuleRoute[];
  }

  export interface IControllerDataContext {
    route: RouteLocationNormalizedLoaded;
  }

  export interface IModuleResource {
    pagePathSchemas?: TypePageSchemas;
    pageNameSchemas?: TypePageSchemas;
  }

  export interface ZovaConfigRoutes {
    path: Record<keyof IPagePathRecord, IModuleRoute>;
    name: Record<keyof IPageNameRecord, IModuleRoute>;
  }

  export interface IEventRecord {
    'a-router:routerGuards': { data: BeanRouter; result: void };
  }

  // export interface IEventRecord {
  //   'a-router:routerGuards': BeanRouter;
  // }

  // export interface IEventResultRecord {
  //   'a-router:routerGuards': void;
  // }
}
