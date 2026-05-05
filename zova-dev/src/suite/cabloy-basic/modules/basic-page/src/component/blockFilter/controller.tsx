import type { IJsxRenderContextPage, IFormMeta, ISchemaRenderComponentLayoutOptions } from 'zova-module-a-openapi';
import type { ModelResource } from 'zova-module-rest-resource';

import { isNilOrEmptyString } from '@cabloy/utils';
import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeFormOnSubmitData, ZForm } from 'zova-module-a-form';
import { IResourceBlockOptionsFilter } from 'zova-module-basic-openapi';

export interface ControllerBlockFilterProps extends IResourceBlockOptionsFilter {}

@Controller()
export class ControllerBlockFilter extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  formMeta: IFormMeta;
  formFieldLayout: ISchemaRenderComponentLayoutOptions;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {
    this.formMeta = { formMode: 'edit' };
    this.formFieldLayout = { inline: true };
  }

  get schemaFilter() {
    return this.$$modelResource.schemaFilter;
  }

  submitData(data: TypeFormOnSubmitData) {
    this._onFilter(data.value);
  }

  resetData(data: any) {
    this._onFilter(data);
  }

  _onFilter(dataOld: any) {
    const { $$page } = this.$$renderContext;
    const dataNew = {};
    for (const key in dataOld) {
      const value = dataOld[key];
      if (!isNilOrEmptyString(value)) {
        dataNew[key] = value;
      }
    }
    $$page.onFilter?.(dataNew);
  }

  protected render() {
    const { $$page } = this.$$renderContext;
    return (
      <ZForm
        class={classes(this.$props.class, this.$style(this.$props.style))}
        inline={true}
        data={$$page.queryFilterData}
        schema={this.schemaFilter}
        schemaScene="filter"
        formMeta={this.formMeta}
        formFieldLayout={this.formFieldLayout}
        onSubmitData={data => this.submitData(data as never)}
        slotFooter={$$form => {
          return (
            <>
              <button
                class="btn btn-primary"
                onClick={() => {
                  $$form.submit();
                }}
              >
                {this.scope.locale.Search()}
              </button>
              <button
                class="btn btn-warning"
                onClick={() => {
                  const data = $$form.reset();
                  this.resetData(data);
                }}
              >
                {this.scope.locale.Reset()}
              </button>
            </>
          );
        }}
      ></ZForm>
    );
  }
}
