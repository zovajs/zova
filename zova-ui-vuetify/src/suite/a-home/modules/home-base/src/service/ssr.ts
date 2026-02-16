import { BeanBase } from 'zova';
import { Service } from 'zova-module-a-bean';

export const ErrorMessageJwtExpired = 'jwt expired';

@Service()
export class ServiceSsr extends BeanBase {
  public async initialize() {
    // ssr errorHandler
    if (process.env.SERVER) {
      this._ssrErrorHandler();
    }
    if (process.env.CLIENT && this.$ssr.isRuntimeSsrPreHydration) {
      this.$ssr.onHydrated(() => {
        this.$vuetify.display.update();
      });
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
