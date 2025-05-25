import { AxiosRequestConfig } from 'axios';
import { BeanInterceptorBase, IDecoratorInterceptorOptions, Interceptor, NextInterceptorRequest } from 'zova-module-a-fetch';

export interface IInterceptorOptionsHeaders extends IDecoratorInterceptorOptions {
  openapiSchema?: boolean;
}

@Interceptor<IInterceptorOptionsHeaders>({ dependencies: 'a-interceptor:mock' })
export class InterceptorHeaders extends BeanInterceptorBase<IInterceptorOptionsHeaders> {
  async onRequest(
    config: AxiosRequestConfig,
    options: IInterceptorOptionsHeaders,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    // locale
    const key = this.sys.env.APP_LOCALE_HEADER_KEY;
    if (key && !config.headers![key]) {
      config.headers![key] = this.app.meta.locale.current;
    }
    // openapi schema
    if (options.openapiSchema) {
      config.headers!['x-vona-openapi-schema'] = true;
    }
    // next
    return next(config);
  }
}
