import type { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerWrapperForm } from '../wrapperForm/controller.jsx';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  wrapperFormRef?: ControllerWrapperForm;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {}

  onOperationCreate() {
    this.wrapperFormRef?.showModal();
  }
}
