import type { Pinia } from 'pinia';
import { createPinia } from 'pinia';
import { BeanBase } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServicePinia extends BeanBase {
  pinia: Pinia;

  protected async __init__() {
    this.pinia = createPinia();
    this.app.vue.use(this.pinia);
    // onRendered
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (!err) {
          this.ctx.meta.$ssr.stateDefer.pinia = this.pinia.state.value;
        }
        this.pinia.state.value = {};
      });
    }
    // client
    if (process.env.CLIENT && this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      this.pinia.state.value = this.ctx.meta.$ssr.stateDefer.pinia;
    }
  }
}
