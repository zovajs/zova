import type { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw } from '@cabloy/vue-router';
import type { z } from 'zod';
import type { TypeComponentLayoutRecord } from 'zova';
import type { BeanRouter } from '../bean/bean.router.js';

import type { IGotoPageOptions } from './utils.js';
import 'vue-router';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

declare module '@cabloy/vue-router' {
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
  export interface ZovaApplication {
    $redirect(pagePath: string, status?: 301 | 302): never;
    $gotoPage(pagePath: string, options?: IGotoPageOptions): void;
    $gotoHome(): void;
    $gotoLogin(returnTo?: string, cause?: string): void;
    $gotoReturnTo(returnTo?: string): void;
    $getCurrentPagePath(): string | undefined;
  }

  export interface AppMeta {
    $router: BeanRouter;
  }
  export interface BeanBase {
    $router: BeanRouter;
  }

  export interface IModuleResource {
    routes: IModuleRoute[];
  }

  export interface IControllerDataContext {
    route?: RouteLocationNormalizedLoaded;
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

export interface IPageNameRecord {}
export interface IPagePathRecord {}
export interface IPagePathSchemaRecord {}

export interface TypePageSchema { params?: z.ZodTypeAny; query: z.ZodTypeAny }
export type TypePageSchemas = Record<string, TypePageSchema>;

export interface TypePagePathSchema<P = unknown, S = unknown> {
  path: P;
  schema: S;
}
