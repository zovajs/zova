import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';

@Virtual()
export class BeanInterceptorBase extends BeanBase {
  protected async __init__() {}
}
