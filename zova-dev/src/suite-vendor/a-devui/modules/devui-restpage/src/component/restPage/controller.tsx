import type { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    // sdkFindAll
    const querySdkFindMany = this.$$restResource.getQuerySdkFindMany();
    await querySdkFindMany.suspense();
    // dataFindAll
    const queryDataFindMany = this.$$restResource.getQueryDataFindMany();
    await queryDataFindMany.suspense();
  }
}
