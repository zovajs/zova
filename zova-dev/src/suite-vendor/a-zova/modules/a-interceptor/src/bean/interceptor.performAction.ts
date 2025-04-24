import { AxiosRequestConfig } from 'axios';
import { ISsrSitePerformActionOptions } from 'zova';
import { BeanInterceptorBase, IDecoratorInterceptorOptions, IInterceptorRequest, Interceptor, NextInterceptorRequest } from 'zova-module-a-fetch';

export interface IInterceptorOptionsPerformAction extends IDecoratorInterceptorOptions {}

@Interceptor<IInterceptorOptionsPerformAction>({ dependencies: 'a-interceptor:mock' })
export class InterceptorPerformAction extends BeanInterceptorBase<IInterceptorOptionsPerformAction> implements IInterceptorRequest {
  async onRequest(
    config: AxiosRequestConfig,
    _options: IInterceptorOptionsPerformAction,
    next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    const performAction = this.ctx.meta.ssr.getPerformAction(config.baseURL);
    if (!performAction) return next();
    const data: ISsrSitePerformActionOptions = {
      method: config.method as any,
      path: config.url!,
      query: config.params,
      body: config.data,
      headers: config.headers,
    };
    const result = await performAction(data);
    throw result;
  }
}
