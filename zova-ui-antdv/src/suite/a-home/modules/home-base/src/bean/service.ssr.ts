import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { createCache, extractStyle } from 'ant-design-vue';

@Service()
export class ServiceSSR extends BeanBase<ScopeModule> {
  styleCache: ReturnType<typeof createCache>;

  public async initialize() {
    // ssr style
    this.styleCache = createCache();
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        const styles = extractStyle(this.styleCache);
        this.ctx.meta.ssr.context._meta.endingHeadTags += styles;
      });
    }
  }
}
