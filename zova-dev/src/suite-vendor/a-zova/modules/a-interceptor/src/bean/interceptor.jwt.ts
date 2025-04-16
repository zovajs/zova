import type { AxiosRequestConfig } from 'axios';
import type {
  BeanFetch,
  IDecoratorInterceptorOptions,
  IInterceptorRequest,
  NextInterceptorRequest,
} from 'zova-module-a-fetch';
import type { IJwtAdapter } from '../types/jwt.js';
import { isNil } from '@cabloy/utils';
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
    options: IInterceptorOptionsJwt,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    const accessToken = await this.prepareAccessToken(options.authToken);
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return next(config);
  }

  async prepareAccessToken(authToken: string | boolean | undefined): Promise<string | undefined> {
    if (!this.sys.config.api.jwt) return;
    if (isNil(authToken)) authToken = this.scope.config.authToken.default;
    // authToken: false
    if (authToken === false) return;
    // authToken: string
    if (typeof authToken === 'string') return authToken;
    // authToken: true
    let jwtInfo = await this._beanJwtAdapter.getJwtInfo();
    if (!jwtInfo) return;
    // accessToken
    if (process.env.SERVER || (!jwtInfo.expireTime || jwtInfo.expireTime > Date.now())) {
      return jwtInfo?.accessToken;
    }
    // refreshToken
    if (!jwtInfo.refreshToken) throw new Error('no refreshToken');
    jwtInfo = await this._beanJwtAdapter.refreshAuthToken(jwtInfo.refreshToken);
    return jwtInfo.accessToken;
  }
}
