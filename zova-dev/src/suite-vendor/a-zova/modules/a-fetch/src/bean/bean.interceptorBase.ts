import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { BeanFetch } from './bean.fetch.js';
import { IDecoratorInterceptorOptions, NextInterceptorRequest } from '../types/interceptor.js';
import { AxiosRequestConfig } from 'axios';

@Virtual()
export class BeanInterceptorBase<
  T extends IDecoratorInterceptorOptions = IDecoratorInterceptorOptions,
> extends BeanBase {
  protected $beanFetch: BeanFetch;

  protected async __init__(beanFetch: BeanFetch) {
    this.$beanFetch = beanFetch;
  }

  async onRequest(
    _config: AxiosRequestConfig,
    _options: T,
    _next: NextInterceptorRequest,
  ): Promise<AxiosRequestConfig> {
    throw new Error('Not Implemented');
  }
}
