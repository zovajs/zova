import type { Router, RouterOptions } from '@cabloy/vue-router';
import { IModule } from '@cabloy/module-info';
import * as ModuleInfo from '@cabloy/module-info';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from '@cabloy/vue-router';
import { BeanBase, cast, deepExtend } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { IModuleRoute, IModuleRouteComponent, IPagePathRecord } from '../types.js';
import { getRealRouteName } from '../utils.js';

export interface SysRouter extends Router {}

@Sys()
export class SysRouter extends BeanBase {
  private _vueRouterSys: Router;

  get router(): Router {
    return this._vueRouterSys;
  }

  protected __get__(prop) {
    return this._vueRouterSys && this._vueRouterSys[prop];
  }

  protected async __init__() {
    // create router
    this._vueRouterSys = this.createRouter();
    // config.routes
    this._loadConfigRoutes();
    // legacy routes
    this._loadLegacyRoutes();
  }

  public createRouter(options?: RouterOptions) {
    options = Object.assign({}, options);
    // matcher
    if (!options.matcher) {
      options.matcher = this._vueRouterSys?.matcher;
    }
    // routes
    if (!options.routes) {
      if (!this._vueRouterSys) {
        options.routes = [];
      }
    }
    // scrollBehavior
    if (!options.scrollBehavior) {
      options.scrollBehavior = () => ({ left: 0, top: 0 });
    }
    // history
    if (!options.history) {
      const createHistory = process.env.SERVER
        ? createMemoryHistory
        : this.sys.env.APP_ROUTER_MODE === 'history'
          ? createWebHistory
          : createWebHashHistory;
      options.history = createHistory(this.sys.env.APP_ROUTER_BASE);
    }
    // create
    const router = createRouter(options);
    cast(router).__hasDevtools = true;
    return router;
  }

  public createAsyncComponent(component: string | IModuleRouteComponent) {
    if (typeof component !== 'string') return component;
    return this.sys.meta.component.createAsyncComponent(component);
  }

  public getPagePath<K extends keyof IPagePathRecord>(path: IPagePathRecord[K]['path'], query?: IPagePathRecord[K]['schema'], absolute?: boolean) {
    const url = absolute ? this.sys.util.getAbsolutePagePath(path) : path;
    return this._combineQueries(url, query);
  }

  public checkPathValid(to?: { name?: string; path?: string } | string): boolean {
    const _name = to && typeof to === 'object' ? to.name : undefined;
    const _path = to && typeof to === 'object' ? (to.name ?? to.path) : to;
    // legacy
    if (this._findLegacyRoute(_name, _path)) return true;
    // general check
    if (!_path) return true;
    const moduleName = ModuleInfo.parseName(_path);
    if (!moduleName) return true;
    return this.sys.meta.module.exists(moduleName);
  }

  private _combineQueries(pagePath: string, query: any) {
    const query2: any[] = [];
    const strs: string[] = [];
    if (query) {
      for (const key in query) {
        const value = query[key];
        if (value && typeof value === 'object') {
          query2.push([key, value]);
        } else {
          strs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
    }
    // query2
    for (const [key, value] of query2) {
      strs.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
    }
    const queryStr = strs.join('&');
    // join
    return queryStr ? `${pagePath}?${queryStr}` : pagePath;
  }

  /** @internal */
  public _registerRoutes(module: IModule) {
    if (!module.resource.routes) return;
    for (const route of module.resource.routes) {
      this._registerRoute(route, module);
    }
  }

  /** @internal */
  public _findConfigRoute(
    name: string | symbol | null | undefined,
    path: string | undefined,
  ): IModuleRoute | undefined {
    name = this.getRealRouteName(name);
    return name ? this.sys.config.routes.name[name] : this.sys.config.routes.path[path!];
  }

  /** @internal */
  public _findLegacyRoute(
    name: string | symbol | null | undefined,
    path: string | undefined,
  ): IModuleRoute | undefined {
    const legacyRoutes = cast(this.sys.meta).legacyRoutes;
    if (!legacyRoutes) return;
    name = this.getRealRouteName(name);
    return legacyRoutes.find(item => {
      return name ? item.name === name : item.path === path;
    });
  }

  getRealRouteName(name?: string | symbol | null): string | undefined {
    return getRealRouteName(name);
  }

  private _loadConfigRoutes() {
    const routesPath = this.sys.config.routes.path;
    for (const key in routesPath) {
      const route = routesPath[key];
      this._loadConfigRoute({ ...route, path: key, name: `$:${key}` });
    }
    const routesName = this.sys.config.routes.name;
    for (const key in routesName) {
      const route = routesName[key];
      this._loadConfigRoute({ ...route, path: route.path || (route.alias as string), name: key });
    }
  }

  private _loadLegacyRoutes() {
    const legacyRoutes = cast(this.sys.meta).legacyRoutes;
    if (!legacyRoutes) return;
    for (const route of legacyRoutes) {
      this._registerRoute(route);
    }
  }

  private _loadConfigRoute(route: IModuleRoute) {
    this.router.addRoute(route);
  }

  private _registerRoute(route: IModuleRoute, module?: IModule) {
    // path
    let path: string | undefined;
    if (route.path !== undefined) {
      if (!module || route.meta?.absolute === true) {
        path = route.path;
      } else {
        path = route.path
          ? `/${module.info.pid}/${module.info.name}/${route.path}`
          : `/${module.info.pid}/${module.info.name}`;
      }
    }
    // name
    let name: string | undefined;
    if (route.name) {
      if (!module || route.meta?.absolute === true) {
        name = String(route.name);
      } else {
        name = `${module.info.relativeName}:${String(route.name)}`;
      }
    }
    // config route
    const configRoute = name ? this.sys.config.routes.name[name] : this.sys.config.routes.path[path!];
    if (configRoute) {
      route = deepExtend({}, route, configRoute);
    }
    // name alias
    if (name && configRoute?.alias) {
      // add extra route
      this.router.addRoute({ name: `$alias:${name}`, path: `/__alias__${configRoute?.alias}`, redirect: '' });
    }
    // name
    if (!name) {
      name = `$:${path}`;
    }
    // meta
    const meta = route.meta;
    // component
    const component = route.component;
    // layout / routeData
    let layout = meta?.layout;
    let routeData;
    let routeNameParent;
    if (layout === false) {
      routeData = { ...route, name, path, component, meta };
    } else {
      if (layout === undefined || layout === 'default') {
        layout = this.sys.config.layout.component.default;
      } else if (layout === 'empty') {
        layout = this.sys.config.layout.component.empty;
      }
      routeNameParent = `$:${name}`;
      routeData = {
        name: routeNameParent,
        path,
        component: this.createAsyncComponent(layout as any),
        children: [{ ...route, name, path: '', component, meta }],
      };
    }
    // force delete
    if (this.router.hasRoute(routeNameParent)) {
      this.router.removeRoute(routeNameParent);
    }
    if (this.router.hasRoute(name)) {
      this.router.removeRoute(name);
    }
    // add
    this.router.addRoute(routeData);
  }
}
