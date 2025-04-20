import type { ComponentPublicInstance } from 'vue';
import type { IErrorObject } from '../../bean/resource/error/errorObject.js';
import type { ErrorSSR, IModuleError, OnErrorHandler } from '../../bean/resource/error/type.js';
import { ErrorClass } from '../../bean/resource/error/errorClass.js';

const SymbolErrorHandlers = Symbol('SymbolErrorHandlers');
const SymbolErrorSSR = Symbol('SymbolErrorSSR');

export class AppError extends ErrorClass {
  private [SymbolErrorHandlers]: OnErrorHandler[] = [];
  private [SymbolErrorSSR]?: ErrorSSR;

  /** @internal */
  public async initialize() {
    await super.initialize();
    // todo: should emit async event
    this.app.vue.config.errorHandler = async (err, instance, info) => {
      this.ctx.util.instanceScope(() => {
        if (this[SymbolErrorHandlers].length === 0) {
          console.error(err);
        } else {
          this[SymbolErrorHandlers].forEach(fn => fn(err, instance, info));
        }
      });
      return err;
    };
    if (process.env.SERVER) {
      this.onErrorHandler((err, instance, info) => {
        this._onErrorHandlerSSR(err, instance, info);
      });
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

  public onErrorHandler(fn: OnErrorHandler) {
    this[SymbolErrorHandlers].push(fn);
  }

  private _onErrorHandlerSSR(err: unknown, _instance: ComponentPublicInstance | null, _info: string) {
    this[SymbolErrorSSR] = err as ErrorSSR;
  }
}
