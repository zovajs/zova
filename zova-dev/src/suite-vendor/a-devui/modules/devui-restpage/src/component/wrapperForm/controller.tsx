import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-a-rest';

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  formVisible: boolean = false;
  formMeta: IFormMeta = {};

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {}
}
