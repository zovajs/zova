import * as ModuleInfo from '@cabloy/module-info';
import { Service } from 'zova-module-a-bean';
import { BeanRouter } from '../bean/bean.router.js';
import { BeanRouterBase } from '../bean/bean.routerBase.js';

@Service()
export class ServiceRouter extends BeanRouterBase {
  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      // match path
      let match = to.matched.find(item => item.aliasOf);
      if (match) {
        match = match.aliasOf;
      } else {
        match = to.matched[to.matched.length - 1];
        // prepareCheck
        if (!(await this._prepareCheck(match?.path, to.path))) {
          // redirect again
          return to.fullPath;
        }
        // legacy
        const legacyRoute = router._findLegacyRoute(match?.name, match?.path);
        if (legacyRoute) return;
        // alias
        const configRoute = router._findConfigRoute(match?.name, match?.path);
        const alias = configRoute?.alias;
        if (alias) {
          // force load module
          const resLoadModule = await this._forceLoadModule(router, match?.name, match?.path);
          if (resLoadModule && resLoadModule !== true) return resLoadModule;
          if (resLoadModule === false) return to.fullPath;
          if (router.getRealRouteName(match?.name)) {
            const routeAlias = router.resolveName(`$alias:${match?.name as string}` as any, {
              params: to.params,
              query: to.query,
            });
            return routeAlias.startsWith('/__alias__') ? routeAlias.substring('/__alias__'.length) : routeAlias;
          } else {
            return {
              path: Array.isArray(alias) ? alias[0] : alias,
              params: to.params,
              query: to.query,
            };
          }
        }
      }
      // force load module
      const resLoadModule = await this._forceLoadModule(router, match?.name, match?.path);
      if (resLoadModule === true) return;
      if (resLoadModule) return resLoadModule;
      // redirect again
      return to.fullPath;
    });
  }

  // if 404 then check if module loaded
  private async _prepareCheck(pathMatched: string | undefined, pathTo: string): Promise<boolean> {
    if (pathMatched === '/:catchAll(.*)*') {
      const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(pathTo));
      if (
        moduleInfo &&
        this.app.meta.module.exists(moduleInfo.relativeName) &&
        !this.app.meta.module.get(moduleInfo.relativeName, false)
      ) {
        // use module
        await this.app.meta.module.use(moduleInfo.relativeName);
        // redirect again
        return false;
      }
    }
    return true;
  }

  private async _forceLoadModule(
    router: BeanRouter,
    name: string | symbol | null | undefined,
    path: string | undefined,
  ): Promise<string | boolean | undefined> {
    const nameOrPath = router.getRealRouteName(name) || path;
    // module info
    const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(nameOrPath));
    if (!moduleInfo) {
      // donothing
      return true;
    }
    const moduleName = moduleInfo.relativeName;
    // check if exists
    if (!this.app.meta.module.exists(moduleName)) return '/404';
    // check if loaded
    const module = this.app.meta.module.get(moduleName, false);
    if (module) return true;
    // use module
    await this.app.meta.module.use(moduleName);
    // means need load
    return false;
  }
}
