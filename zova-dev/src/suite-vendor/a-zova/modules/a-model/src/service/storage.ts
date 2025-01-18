import { BeanBase, deepExtend } from 'zova';
import { Service } from 'zova-module-a-bean';
import { dehydrate, hydrate, QueryClient, VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

@Service()
export class ServiceStorage extends BeanBase {
  protected async __init__() {
    // options
    let options = this.scope.config.queryClientConfig.defaultOptions;
    if (process.env.SERVER) {
      options = deepExtend({}, options, {
        queries: { gcTime: Infinity },
      });
    }
    // queryClient
    const queryClient = new QueryClient({
      defaultOptions: options,
    });
    // use plugin
    const vueQueryPluginOptions: VueQueryPluginOptions = { queryClient };
    this.app.vue.use(VueQueryPlugin, vueQueryPluginOptions);
    // onRendered
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.stateDefer.query = dehydrate(queryClient, {
          shouldDehydrateMutation: () => {
            return false;
          },
        });
        queryClient.clear();
      });
    }
    // client
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      hydrate(queryClient, this.ctx.meta.ssr.stateDefer.query);
    }
  }
}
