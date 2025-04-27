import type {
  BeanBase,
  BeanContainer,
  IControllerData,
  IMonkeyAppInitialize,
  IMonkeyAppInitialized,
  IMonkeyAppReady,
  IMonkeyController,
} from 'zova';
import type { BeanRouter } from './bean/bean.router.js';
import type { TypePageSchema } from './types/router.js';
import * as ModuleInfo from '@cabloy/module-info';
import { useRoute } from '@cabloy/vue-router';
import {
  BeanControllerPageBase,
  BeanSimple,
  useComputed,
} from 'zova';
import { ServiceRouter } from './service/router.js';
import { SymbolRouterHistory } from './types/utils.js';
import { getRealRouteName } from './utils.js';

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
  }

  async appInitialized() {
    const beanRouter = await this.getBeanRouter();
    // emit event
    await this.app.meta.event.emit('a-router:routerGuards', beanRouter);
  }

  async appReady() {
    const beanRouter = await this.getBeanRouter();
    // pagePath
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
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
      const pagePath = this.app.getCurrentPagePath();
      beanRouter.push(pagePath);
      await beanRouter.isReady();
    } else if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
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
    controllerData.context.route = useRoute();
  }

  controllerDataInit(controllerData: IControllerData, controller: BeanBase) {
    // only for controller page
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = controllerData.context.route;
    if (!route) return;
    const routeName = getRealRouteName(route.name);
    const schemaKey = routeName || String(route.path);
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
    controller.$params = useComputed(() => {
      if (!schemas?.params) throw new Error(`page params schema not found: ${schemaKey}`);
      return schemas.params.parse(route.params);
    });
    controller.$query = useComputed(() => {
      if (!schemas?.query) throw new Error(`page query schema not found: ${schemaKey}`);
      return schemas.query.parse(route.query);
    });
  }
}
