import { BeanBase, UseScope } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

export const ErrorMessageJwtExpired = 'jwt expired';

@Service()
export class ServiceSsr extends BeanBase {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.$ssr.onHydrated(() => {
        // do something
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        if (!this.$$scopeSsr.config.cookieThemeDark) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.setAttribute('data-theme', window.ssr_themedark_data);
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
      });
    }
    // ssr errorHandler
    if (process.env.SERVER) {
      this._ssrErrorHandler();
    }
  }

  private _ssrErrorHandler() {
    if (!process.env.SERVER) return;
    const _eventErrorHandler = this.app.meta.event.on('app:errorHandler', ({ err }, next) => {
      if (err.code === 401) {
        if (err.message === ErrorMessageJwtExpired) {
          try {
            this.app.$gotoPage('/home/base/errorExpired', { returnTo: true });
          } catch (err: any) {
            this.ctx.meta.$ssr.context._meta.renderError = err;
          }
          return undefined;
        }
      }
      return next();
    });
    this.ctx.meta.$ssr.context.onRendered((_err?: Error) => {
      _eventErrorHandler();
    });
  }
}
