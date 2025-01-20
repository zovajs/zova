import { AxiosRequestConfig } from 'axios';
import {
  BeanInterceptorBase,
  IDecoratorInterceptorOptions,
  IInterceptorRequest,
  Interceptor,
  NextInterceptorRequest,
} from 'zova-module-a-fetch';
import { IJwtAdapter } from '../types/jwt.js';

export interface IInterceptorOptionsJwt extends IDecoratorInterceptorOptions {
  jwtAdapter?: string;
}

@Interceptor<IInterceptorOptionsJwt>({ dependencies: 'a-interceptor:body' })
export class InterceptorJwt extends BeanInterceptorBase<IInterceptorOptionsJwt> implements IInterceptorRequest {
  private _beanJwtAdapter: IJwtAdapter;

  protected async __init__() {
    const beanFullName = this.scope.config.jwtAdapter.replace(':', '.service.');
    this._beanJwtAdapter = await this.bean._newBean(beanFullName as any, true);
  }

  async onRequest(
    config: AxiosRequestConfig,
    _options: IInterceptorOptionsJwt,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    if (this.app.config.api.jwt) {
      const authorization = await this._beanJwtAdapter.getAuthorization();
      config.headers!.Authorization = `Bearer ${authorization || ''}`;
    }
    return next(config);
  }
}
