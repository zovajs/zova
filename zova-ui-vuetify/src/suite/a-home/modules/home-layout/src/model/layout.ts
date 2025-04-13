import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';

@Model()
export class ModelLayout extends BeanModelBase<ScopeModule> {
  leftDrawerOpenPC: boolean;

  protected async __init__() {
    this.leftDrawerOpenPC =
      process.env.SSR && !this.sys.config.ssr.optimization.bodyReadyObserver
        ? this.sys.config.layout.sidebar.leftOpenPC
        : this.$useStateLocal({
            queryKey: ['sidebarLeftOpenPC'],
            meta: {
              defaultData: this.sys.config.layout.sidebar.leftOpenPC,
            },
          });
  }
}
