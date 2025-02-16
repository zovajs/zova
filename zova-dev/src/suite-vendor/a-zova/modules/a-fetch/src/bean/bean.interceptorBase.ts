import type { IDecoratorInterceptorOptions } from '../types/interceptor.js';
import type { BeanFetch } from './bean.fetch.js';
import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';

@Virtual()
export class BeanInterceptorBase<
  T extends IDecoratorInterceptorOptions = IDecoratorInterceptorOptions,
> extends BeanBase {
  protected $beanFetch: BeanFetch;
  protected $options: T;

  protected async __init__(beanFetch: BeanFetch, options: T) {
    this.$beanFetch = beanFetch;
    this.$options = options;
  }
}
