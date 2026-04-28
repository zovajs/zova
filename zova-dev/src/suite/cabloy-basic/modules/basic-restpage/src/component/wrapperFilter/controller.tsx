import type { ModelResource } from 'zova-module-rest-resource';

import { isNilOrEmptyString } from '@cabloy/utils';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { ISchemaRenderComponentLayoutOptions } from 'zova-module-a-openapi';

export interface ControllerWrapperFilterProps {
  formData?: any;
  formProvider?: IFormProvider;
  onFilter?: (data: any) => void;
}

@Controller()
export class ControllerWrapperFilter extends BeanControllerBase {
  static $propsDefault = {};

  formMeta: IFormMeta;
  formFieldLayout: ISchemaRenderComponentLayoutOptions;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    this.formMeta = { formMode: 'edit' };
    this.formFieldLayout = { inline: true };
  }

  get schema() {
    return this.$$modelResource.schemaFilter;
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
