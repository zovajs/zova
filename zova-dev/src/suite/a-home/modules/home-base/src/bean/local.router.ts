import { Local, Use } from 'zova';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';
import { ModelAuth } from 'zova-module-home-user';

@Local()
export class LocalRouter extends BeanRouterBase {
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
