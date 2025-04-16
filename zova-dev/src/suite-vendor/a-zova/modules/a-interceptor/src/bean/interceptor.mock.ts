import { AxiosError } from 'axios';
import { BeanInterceptorBase, IDecoratorInterceptorOptions, IInterceptorResponseError, Interceptor, NextInterceptorError } from 'zova-module-a-fetch';

export interface IInterceptorOptionsMock extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsMock>({ meta: { mode: 'development' } })
export class InterceptorMock extends BeanInterceptorBase<IInterceptorOptionsMock> implements IInterceptorResponseError {
  async onResponseError(
    error: AxiosError,
    _options: IDecoratorInterceptorOptions,
    next: NextInterceptorError,
  ): Promise<AxiosError> {
    if (error.code === 'ERR_NETWORK' || error.status === 404) {
      const config = error.config!;
      const baseURL = `http://localhost:${this.sys.env.DEV_SERVER_PORT}${this.sys.env.API_PREFIX}`;
      if (config.baseURL && (config.baseURL !== baseURL && config.baseURL !== this.sys.env.API_PREFIX)) {
        return await this.$fetch.request(Object.assign({}, config, { baseURL: this.sys.env.API_PREFIX }));
      }
    }
    return next();
  }
}
