import type { BeanRouter } from 'zova-module-a-router';
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
        await this.$$modelPassport.ensurePassport();
        if (!this.$$modelPassport.isAuthenticated) {
          return '/login';
        }
      }
    });
  }
}
