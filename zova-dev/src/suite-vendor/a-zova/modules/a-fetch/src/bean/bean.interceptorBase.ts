import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { BeanFetch } from './bean.fetch.js';

@Virtual()
export class BeanInterceptorBase extends BeanBase {
  protected $beanFetch: BeanFetch;

  protected async __init__(beanFetch: BeanFetch) {
    this.$beanFetch = beanFetch;
  }
}
