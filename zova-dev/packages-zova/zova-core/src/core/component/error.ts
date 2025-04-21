import type { IErrorObject } from '../../bean/resource/error/errorObject.js';
import type { ErrorSSR, IErrorInstanceInfo, IModuleError } from '../../bean/resource/error/type.js';
import { ErrorClass } from '../../bean/resource/error/errorClass.js';
import { SymbolErrorInstanceInfo } from '../../bean/resource/error/type.js';
import { cast } from '../../types/utils/cast.js';

const SymbolErrorSSR = Symbol('SymbolErrorSSR');

export class AppError extends ErrorClass {
  private [SymbolErrorSSR]?: ErrorSSR;

  /** @internal */
  public async initialize() {
    await super.initialize();
    // errorHandler
    this.app.vue.config.errorHandler = async (err, instance, info) => {
      return await this.app.meta.event.emit('app:errorHandler', { err: err as Error, instance, info }, async ({ err }) => {
        // server
        if (process.env.SERVER) {
          this[SymbolErrorSSR] = err as ErrorSSR;
          return undefined;
        }
        // client
        if ([301, 302].includes(Number(err.code))) {
          this.app.gotoPage(cast<ErrorSSR>(err).pagePath!);
          return undefined;
        }
        // only log error in client
        console.error(err);
        if (err.code === 401) {
          this.app.gotoLogin();
          return undefined;
        }
        // not handled
        return err;
      });
    };
    // unhandledrejection
    if (process.env.CLIENT) {
      window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        event.preventDefault();
        this._handleUnhandledError(event.reason, 'unhandledrejection');
        return false;
      });
      window.addEventListener('error', (event: ErrorEvent) => {
        event.preventDefault();
        this._handleUnhandledError(event.error, 'unhandlederror');
        return false;
      });
    }
    // ssr
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        if (this[SymbolErrorSSR]) {
          throw this[SymbolErrorSSR];
        }
      });
    }
  }

  /** @internal */
  public createScopeError(moduleScope: string, errorCode: number | string): IModuleError {
    const self = this;
    return {
      throw: (...args: any[]): never => {
        return self.throw(moduleScope, errorCode, ...args);
      },
      parseFail: (...args: any[]): IErrorObject => {
        return self.parseFail(moduleScope, errorCode, ...args);
      },
    };
  }

  private async _handleUnhandledError(error: Error, infoDefault: string) {
    if (error instanceof Error) {
      const errorInfo: IErrorInstanceInfo = error[SymbolErrorInstanceInfo];
      // should not catch error
      await (this.app.vue.config.errorHandler!(error, errorInfo?.instance as any, errorInfo?.info || infoDefault) as unknown as Promise<Error>);
    }
  }
}
