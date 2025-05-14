import type { RouteLocationMatched, RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import type {
  BeanBase,
  BeanContainer,
  IControllerData,
  IMonkeyAppInitialize,
  IMonkeyAppInitialized,
  IMonkeyAppReady,
  IMonkeyController,
} from 'zova';
import type { ErrorSSR } from 'zova-module-a-ssr';
import type { BeanRouter } from './bean/bean.router.js';
import type { TypePageSchema } from './types/router.js';
import * as ModuleInfo from '@cabloy/module-info';
import { routerViewLocationKey } from '@cabloy/vue-router';
import { inject, shallowReactive } from 'vue';
import {
  BeanControllerPageBase,
  BeanSimple,
  HttpStatus,
} from 'zova';
import { ServiceRouter } from './service/router.js';
import { SymbolRouterHistory } from './types/utils.js';
import { getRealRouteName, getRouteMatched } from './utils.js';

export class Monkey
  extends BeanSimple
  implements IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyController {
  private _beanRouter: BeanRouter;
  serviceRouter: ServiceRouter;

  async getBeanRouter() {
    if (!this._beanRouter) {
      this._beanRouter = this.app.meta.$router = (await this.bean._getBean('a-router.bean.router', false, true)) as BeanRouter;
    }
    return this._beanRouter;
  }

  async appInitialize() {
    // router
    this.serviceRouter = await this.bean._newBean(ServiceRouter, false);
    //  ssr errorHandler
    if (process.env.CLIENT) {
      this._ssrErrorHandler();
    }
  }

  async appInitialized() {
    const beanRouter = await this.getBeanRouter();
    // emit event
    await this.app.meta.event.emit('a-router:routerGuards', beanRouter);
  }

  async appReady() {
    const beanRouter = await this.getBeanRouter();
    // pagePath
    if (process.env.CLIENT && this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      const pagePath = beanRouter.$$modelPageRoute.pagePath;
      if (pagePath) {
        const routerHistory = beanRouter.router[SymbolRouterHistory];
        routerHistory.push(pagePath);
      }
    }
    // use router
    this.app.vue.use(beanRouter);
    // ssr
    if (process.env.SERVER) {
      // push
      const pagePath = this.app.$getCurrentPagePath()!;
      beanRouter.push(pagePath);
      await beanRouter.isReady();
    } else if (process.env.CLIENT && this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      await beanRouter.isReady();
    }
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$router', {
      enumerable: false,
      configurable: true,
      get() {
        return bean._getBeanFromHost('a-router.bean.router');
      },
    });
  }

  controllerDataPrepare(controllerData: IControllerData) {
    controllerData.context.route = inject(routerViewLocationKey)?.value;
  }

  controllerDataInit(controllerData: IControllerData, controller: BeanBase) {
    // only for controller page
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = controllerData.context.route;
    this._initControllerRoute(route, controller);
  }

  controllerDataUpdate(controller: BeanBase) {
    // only for controller page
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = inject(routerViewLocationKey)?.value;
    this._initControllerRoute(route, controller);
  }

  private _initControllerRoute(route: RouteLocationNormalizedLoadedGeneric | undefined, controller: BeanControllerPageBase) {
    if (!route) return;
    const routeMatched = getRouteMatched(route);
    if (!routeMatched) return;
    // check if the same
    if (controller.$routeMatched && !this._checkIfRouteSame(routeMatched, controller.$routeMatched)) return;
    // check if changed
    const changed = !controller.$route || controller.$route.fullPath !== route.fullPath;
    if (!changed) return;
    controller.$route = route;
    controller.$routeMatched = routeMatched;
    // update $params/$query
    const routeName = getRealRouteName(routeMatched.name);
    const schemaKey = routeName || String(routeMatched.path);
    let schemas: TypePageSchema | undefined;
    const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(schemaKey));
    if (!moduleInfo) {
      // do nothing
      return;
    }
    if (!this.app.meta.module.exists(moduleInfo.relativeName)) {
      // do nothing
      return;
    }
    const module = this.app.meta.module.get(moduleInfo.relativeName)!;
    if (routeName) {
      schemas = module.resource.pageNameSchemas?.[schemaKey];
    } else {
      schemas = module.resource.pagePathSchemas?.[schemaKey];
    }
    if (schemas?.params) {
      const params = schemas.params.parse(route.params);
      if (!controller.$params) {
        controller.$params = process.env.SERVER ? params : shallowReactive(params as any);
      } else {
        // hold the same $params ref
        Object.assign(controller.$params as any, params);
      }
    }
    if (schemas?.query) {
      const query = schemas.query.parse(route.query);
      if (!controller.$query) {
        controller.$query = process.env.SERVER ? query : shallowReactive(query as any);
      } else {
        // hold the same $query ref
        Object.assign(controller.$query as any, query);
      }
    }
  }

  private _checkIfRouteSame(route1: RouteLocationMatched, route2: RouteLocationMatched) {
    return ((route1.name && route1.name === route2.name) || route1.path === route2.path);
  }

  private _ssrErrorHandler() {
    if (!process.env.CLIENT) return;
    this.app.meta.event.on('app:errorHandler', (_data, next) => {
      const err = next();
      if (!err || !(err instanceof Error)) return err;
      return this._errorHandlerDefaultClient(err);
    });
  }

  private _errorHandlerDefaultClient(err: ErrorSSR) {
    if (!process.env.CLIENT) return err;
    // client
    if ([301, 302].includes(Number(err.code))) {
      this.app.$gotoPage(err.pagePath!);
      return undefined;
    }
    // COMPONENT_UNMOUNTED
    if (err.code === HttpStatus.COMPONENT_UNMOUNTED) {
      // do nothing
      return undefined;
    }
    // 401
    if (err.code === 401) {
      this.app.$gotoLogin();
      return undefined;
    }
    // only log error in client
    console.error(err);
    // not handled
    return err;
  }
}
