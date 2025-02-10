import { BeanBase, Use } from 'zova';
import { Bean, BeanOnion } from 'zova-module-a-bean';
import { IBehaviors } from '../types/behavior.js';
import { Composer } from '../lib/composer.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  public async createComposer(behaviors: IBehaviors): Promise<Composer> {
    const composer = this.bean._newBeanSimple(Composer, false, this.$$beanOnion);
    await composer.load(behaviors);
    return composer;
  }
}
