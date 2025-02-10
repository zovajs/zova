import { BeanBase, Use } from 'zova';
import { Bean, BeanOnion } from 'zova-module-a-bean';
import { IBehaviors } from '../types/behavior.js';
import { ServiceComposer } from '../service/composer.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  public async createComposer(behaviors: IBehaviors): Promise<ServiceComposer> {
    return await this.bean._newBean(ServiceComposer, false, this.$$beanOnion, behaviors);
  }
}
