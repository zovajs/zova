import type { BeanRouter } from 'zova-module-a-router';
import { catchError } from '@cabloy/utils';
import { cast, Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { BeanRouterGuardsBase } from 'zova-module-a-router';
import { ServiceLocale } from './locale.js';

@Service()
export class ServiceRouterGuards extends BeanRouterGuardsBase {
  @Use()
  $$serviceLocale: ServiceLocale;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$passport.isAuthenticated) {
        const [_res, err] = await catchError(() => {
          return this.$passport.ensurePassport();
        });
        if (err) {
          this.$errorHandler(err, 'onRouterGuards');
          return false;
        }
        if (!this.$passport.isAuthenticated) {
          this.app.$gotoLogin(to.fullPath);
          return false;
        }
      }
    });
    router.beforeResolve(async to => {
      const locale = to.meta?.locale;
      if (locale) {
        this.$$serviceLocale.setLocale(cast(to.params)?.locale);
      }
    });
  }
}
