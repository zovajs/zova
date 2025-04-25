import type { BeanRouter } from 'zova-module-a-router';
import { catchError } from '@cabloy/utils';
import { Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { BeanRouterBase } from 'zova-module-a-router';
import { ModelPassport } from 'zova-module-home-user';

@Service()
export class ServiceRouter extends BeanRouterBase {
  @Use()
  $$modelPassport: ModelPassport;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelPassport.isAuthenticated) {
        const [_res, err] = await catchError(() => {
          return this.$$modelPassport.ensurePassport();
        });
        if (err) {
          this.$errorHandler(err, 'onRouterGuards');
          return false;
        }
        if (!this.$$modelPassport.isAuthenticated) {
          this.app.gotoLogin(to.fullPath);
          return false;
        }
      }
    });
  }
}
