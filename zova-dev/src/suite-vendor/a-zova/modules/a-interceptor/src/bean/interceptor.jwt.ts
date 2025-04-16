import type { AxiosRequestConfig } from 'axios';
import type {
  BeanFetch,
  IDecoratorInterceptorOptions,
  IInterceptorRequest,
  NextInterceptorRequest,
} from 'zova-module-a-fetch';
import type { IJwtAdapter } from '../types/jwt.js';
import {
  BeanInterceptorBase,
  Interceptor,
} from 'zova-module-a-fetch';

export interface IInterceptorOptionsJwt extends IDecoratorInterceptorOptions {
  jwtAdapter?: string;
  authToken?: boolean | string;
}

@Interceptor<IInterceptorOptionsJwt>({ dependencies: 'a-interceptor:body' })
export class InterceptorJwt extends BeanInterceptorBase<IInterceptorOptionsJwt> implements IInterceptorRequest {
  private _beanJwtAdapter: IJwtAdapter;

  protected async __init__(beanFetch: BeanFetch, options: IInterceptorOptionsJwt) {
    super.__init__(beanFetch, options);
    const jwtAdapter = options.jwtAdapter || this.scope.config.jwtAdapter;
    const beanFullName = jwtAdapter.replace(':', '.service.');
    // singleton
    this._beanJwtAdapter = await this.app.bean._getBean(beanFullName as any, true);
  }

  async onRequest(
    config: AxiosRequestConfig,
    _options: IInterceptorOptionsJwt,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    if (!this.sys.config.api.jwt) return next();
    let jwtInfo = await this._beanJwtAdapter.getJwtInfo();
    if (jwtInfo) {
      if (process.env.CLIENT && (jwtInfo.expireTime && jwtInfo.expireTime < Date.now())) {
        if (!jwtInfo.refreshToken) throw new Error('no refreshToken');
        jwtInfo = await this._beanJwtAdapter.refreshAuthToken(jwtInfo.refreshToken);
      }
      config.headers!.Authorization = `Bearer ${jwtInfo?.accessToken || ''}`;
    }
    return next(config);
  }
}
