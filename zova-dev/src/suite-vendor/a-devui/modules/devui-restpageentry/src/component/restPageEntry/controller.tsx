import type { ControllerPageEntry } from 'zova-module-rest-resource';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm } from 'zova-module-a-form';
import { ZPage } from 'zova-module-home-base';
import { ZWrapperForm } from '../../.metadata/index.js';

@Controller()
export class ControllerRestPageEntry extends BeanControllerBase {
  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restPageEntry: ControllerPageEntry;

  protected async __init__() {}

  protected render() {
    <ZPage>
      <ZWrapperForm
        onControllerForm={ref => this.controllerForm = ref}
      ></ZWrapperForm>
    </ZPage>;
  }
}
