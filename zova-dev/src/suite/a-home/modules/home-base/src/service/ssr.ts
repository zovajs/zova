import { BeanBase } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceSsr extends BeanBase {
  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.ssr.onHydrated(() => {
        // do something
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered((err?: Error) => {
        if (err) return;
        if (!this.sys.config.ssr.cookieThemeDark) {
          this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.setAttribute('data-theme', window.ssr_themedark_data);
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
      });
    }
    // ssr errorHandler
    if (process.env.SERVER) {
      const _eventErrorHandler = this.app.meta.event.on('app:errorHandler', async (_data, next) => {
        console.log('---------1');
        return await next();
      });
      this.ctx.meta.ssr.context.onRendered((_err?: Error) => {
        _eventErrorHandler();
      });
    }
  }
}
