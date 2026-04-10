import { BeanBase, Use } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ServiceLocale as ServiceLocaleB } from 'zova-module-home-base';

@Service()
export class ServiceLocale extends BeanBase {
  @Use()
  $$serviceLocale: ServiceLocaleB;

  public async initialize() {
    this.$$serviceLocale.initVuetifyLocale();
  }
}
