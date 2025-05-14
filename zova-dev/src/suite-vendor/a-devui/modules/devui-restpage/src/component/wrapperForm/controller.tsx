import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerPageResource } from 'zova-module-a-rest';

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {}
}
