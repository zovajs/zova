import { BeanBase } from 'zova';
import { createCache, extractStyle } from 'ant-design-vue';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceSsr extends BeanBase {
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
