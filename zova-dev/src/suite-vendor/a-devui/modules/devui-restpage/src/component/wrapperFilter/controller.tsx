import { useId } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormProvider } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-rest-resource';

export interface ControllerWrapperFilterProps {
  formData?: any;
  formProvider?: IFormProvider;
}

@Controller()
export class ControllerWrapperFilter extends BeanControllerBase {
  static $propsDefault = {};

  formDomId: string;
  ormData?: any;

  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    this.formDomId = useId();
  }

  get schema() {
    return this.$$restResource.schemaFilter;
  }
}
