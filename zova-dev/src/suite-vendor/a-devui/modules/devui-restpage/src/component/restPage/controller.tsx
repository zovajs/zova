import type { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {}

  onOperationCreate() {
    console.log('sss');
  }
}
