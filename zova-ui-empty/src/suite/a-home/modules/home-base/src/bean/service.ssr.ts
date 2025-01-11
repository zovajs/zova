import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.ssr.onHydrated(() => {
        // do something
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {});
    }
  }
}
