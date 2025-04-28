import type { IErrorObject } from '../../bean/resource/error/errorObject.js';
import type { IErrorInstanceInfo, IModuleError } from '../../bean/resource/error/type.js';
import { ErrorClass } from '../../bean/resource/error/errorClass.js';
import { SymbolErrorInstanceInfo } from '../../bean/resource/error/type.js';

export class AppError extends ErrorClass {
  /** @internal */
  public async initialize() {
    await super.initialize();
    // errorHandler
    this.app.vue.config.errorHandler = (err, instance, info) => {
      return this.app.meta.event.emitSync('app:errorHandler', { err: err as Error, instance, info }, data => {
        return data.err;
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

  private _handleUnhandledError(error: Error, infoDefault: string) {
    if (error instanceof Error) {
      const errorInfo: IErrorInstanceInfo = error[SymbolErrorInstanceInfo];
      // should not catch error
      this.app.vue.config.errorHandler!(error, errorInfo?.instance as any, errorInfo?.info || infoDefault) as unknown as Error;
    }
  }
}
