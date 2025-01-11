import { BeanBase } from 'zova';
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceSsr extends BeanBase {
  public async initialize() {
    // provide id
    if (process.env.SSR) {
      this.app.vue.provide(ID_INJECTION_KEY, {
        prefix: 1024,
        current: 0,
      });
      this.app.vue.provide(ZINDEX_INJECTION_KEY, { current: 0 });
    }
    // ssr style
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        if (!this.app.config.ssr.cookieThemeDark) {
          this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.documentElement.className=window.ssr_themedark_data;
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
      });
    }
  }
}
