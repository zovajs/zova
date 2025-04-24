import { AxiosRequestConfig } from 'axios';
import { BeanInterceptorBase, IDecoratorInterceptorOptions, Interceptor, NextInterceptorRequest } from 'zova-module-a-fetch';

export interface IInterceptorOptionsLocale extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsLocale>({ dependencies: 'a-interceptor:body' })
export class InterceptorLocale extends BeanInterceptorBase<IInterceptorOptionsLocale> {
  async onRequest(
    config: AxiosRequestConfig,
    _options: IInterceptorOptionsLocale,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    const key = this.sys.env.APP_LOCALE_HEADER_KEY;
    if (key) {
      config.headers![key] = this.app.meta.locale.current;
    }
    return next(config);
  }
}
