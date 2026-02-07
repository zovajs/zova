import { BeanBase } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceLayoutEmptySsr extends BeanBase {
  protected async __init__() {}
}
