import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { BeanFetch } from './bean.fetch.js';
import {
  IDecoratorInterceptorOptions,
  NextInterceptorRequest,
  NextInterceptorRequestError,
} from '../types/interceptor.js';
import { AxiosError, AxiosRequestConfig } from 'axios';

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

  async onRequestError(
    _error: AxiosError,
    _options: T,
    _next: NextInterceptorRequestError,
  ): Promise<AxiosRequestConfig> {
    throw new Error('Not Implemented');
  }
}
