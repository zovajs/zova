import type { IResourceBlockOptionsBase, IJsxRenderContextPageEntry } from 'zova-module-a-openapi';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZForm } from 'zova-module-a-form';

export interface ControllerBlockFormProps extends IResourceBlockOptionsBase {}

@Controller()
export class ControllerBlockForm extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    const { $$pageEntry } = this.$$renderContext;
    return (
      <ZForm
        controllerRef={ref => {
          $$pageEntry.formInstance = ref;
        }}
        formTag="div"
        data={$$pageEntry.formData}
        schema={$$pageEntry.formSchema}
        schemaScene={$$pageEntry.schemaScene}
        formMeta={$$pageEntry.formMeta}
        formProvider={$$pageEntry.formProvider}
        formScope={$$pageEntry.jsxCelScope}
        onSubmitData={data => $$pageEntry.submitData(data)}
        onShowError={({ error }) => {
          // eslint-disable-next-line no-alert
          window.alert(error.message);
        }}
        onChanged={data => {
          $$pageEntry.setPageMeta(data, true);
        }}
      ></ZForm>
    );
  }
}
