import type { BeanResource } from 'zova-module-rest-resource';
import { isNilOrEmptyString } from '@cabloy/utils';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormFieldLayoutOptionsBase, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';

export interface ControllerWrapperFilterProps {
  formData?: any;
  formProvider?: IFormProvider;
  onFilter?: (data: any) => void;
}

@Controller()
export class ControllerWrapperFilter extends BeanControllerBase {
  static $propsDefault = {};

  formMeta: IFormMeta;
  formFieldLayout: IFormFieldLayoutOptionsBase;

  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  protected async __init__() {
    this.formMeta = { formMode: 'edit' };
    this.formFieldLayout = { inline: true };
  }

  get schema() {
    return this.$$beanResource.schemaWhere;
  }

  onSubmit(data: TypeFormOnSubmitData) {
    this._onFilter(data.value);
  }

  onReset(data: any) {
    this._onFilter(data);
  }

  _onFilter(dataOld: any) {
    const dataNew = {};
    for (const key in dataOld) {
      const value = dataOld[key];
      if (!isNilOrEmptyString(value)) {
        dataNew[key] = value;
      }
    }
    this.$props.onFilter?.(dataNew);
  }
}
