import type { IResourceBlockOptionsBase, IJsxRenderContextPageEntry } from 'zova-module-a-openapi';
import type { ModelResource } from 'zova-module-rest-resource';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerBlockFormProps extends IResourceBlockOptionsBase {}

@Controller()
export class ControllerBlockForm<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    // return (
    //   <ComponentForm<TData>
    //     controllerRef={ref => {
    //       this.controllerForm = ref;
    //     }}
    //     data={this.formData}
    //     schema={this.formSchema}
    //     schemaScene={this.schemaScene}
    //     formMeta={this.formMeta}
    //     formProvider={this.formProvider}
    //     formScope={this.pageEntryScope}
    //     onSubmitData={data => this.onSubmit(data)}
    //     onShowError={({ error }) => {
    //       // eslint-disable-next-line no-alert
    //       window.alert(error.message);
    //     }}
    //     onChanged={data => {
    //       this.setPageMeta(data, true);
    //     }}
    //   ></ComponentForm>
    // );
  }
}
