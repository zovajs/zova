import { Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import { ModelAuth } from 'zova-module-home-user';

@Service()
export class ServiceRouter extends BeanRouterBase {
  @Use()
  $$modelAuth: ModelAuth;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      if (to.meta.requiresAuth !== false && !this.$$modelAuth.isAuthenticated) {
        return '/login';
      }
    });
  }
}
