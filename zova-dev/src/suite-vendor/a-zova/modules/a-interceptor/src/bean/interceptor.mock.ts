import { AxiosError } from 'axios';
import { BeanInterceptorBase, IDecoratorInterceptorOptions, IInterceptorResponseError, Interceptor, NextInterceptorError } from 'zova-module-a-fetch';

export interface IInterceptorOptionsMock extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsMock>()
export class InterceptorMock extends BeanInterceptorBase<IInterceptorOptionsMock> implements IInterceptorResponseError {
  async onResponseError(
    error: AxiosError,
    _options: IDecoratorInterceptorOptions,
    next: NextInterceptorError,
  ): Promise<AxiosError> {
    if (this.sys.env.MOCK_ENABLED === 'true') {
      if (process.env.DEV || (process.env.PROD && this.sys.env.MOCK_BUILD === 'true')) {
        if (['ECONNREFUSED', 'ERR_NETWORK', '404'].includes(error.code!) || error.status === 404) {
          const config = error.config!;
          if (config.baseURL) {
            const port = process.env.DEV ? this.sys.env.DEV_SERVER_PORT : this.sys.env.MOCK_BUILD_PORT;
            let baseURL = `http://localhost:${port}`;
            if (config.baseURL.endsWith(this.sys.env.API_PREFIX!)) {
              baseURL = `${baseURL}${this.sys.env.API_PREFIX}`;
            }
            if (config.baseURL !== baseURL && config.baseURL !== this.sys.env.API_PREFIX) {
              return await this.$fetch.request(Object.assign({}, config, { baseURL }));
            }
          }
        }
      }
    }
    return next();
  }
}
