import { BeanBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import { createPinia, Pinia } from 'pinia';

@Local()
export class LocalPinia extends BeanBase {
  pinia: Pinia;

  protected async __init__() {
    this.pinia = createPinia();
    this.app.vue.use(this.pinia);
    // onRendered
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.stateDefer.pinia = this.pinia.state.value;
        this.pinia.state.value = {};
      });
    }
    // client
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      this.pinia.state.value = this.ctx.meta.ssr.stateDefer.pinia;
    }
  }
}
