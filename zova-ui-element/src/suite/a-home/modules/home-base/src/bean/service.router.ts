import { Service } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { BeanRouter, BeanRouterBase } from 'zova-module-a-router';

@Service()
export class ServiceRouter extends BeanRouterBase<ScopeModule> {
  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async _to => {
      //console.log(to);
    });
  }
}
