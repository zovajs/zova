import type { ControllerPageEntry, ModelResource } from 'zova-module-rest-resource';
import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { classes } from 'typestyle';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { ZWrapperForm } from '../../.metadata/index.js';

@Controller()
export class ControllerRestPageEntry extends BeanControllerBase {
  controllerForm: ControllerForm;

  formSchema?: SchemaObject;
  formData?: any;

  @Use({ injectionScope: 'host' })
  $$restPageEntry: ControllerPageEntry;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$modelResource.getFormData(this.formMeta, this.entryId);
    });
    // load schema/data
    await $QueriesAutoLoad(
      () => this.$$modelResource.getFormApiSchemas(this.formMeta)?.sdk,
      () => this.queryData,
    );
  }

  get entryId() {
    return this.$$restPageEntry.entryId;
  }

  get formMeta() {
    return this.$$restPageEntry.formMeta;
  }

  get queryData() {
    if (isNil(this.entryId)) return;
    return this.$$modelResource.view(this.entryId);
  }

  protected render() {
    const { formMeta } = this.$$restPageEntry;
    return (
      <div>
        <ZWrapperForm
          onControllerForm={ref => this.controllerForm = ref}
        ></ZWrapperForm>
        <div>
          {this.controllerForm?.formState.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
          {formMeta.formMode === 'edit' && (
            <button
              class={classes('btn btn-primary', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
              onClick={async () => {
                const res = await this.controllerForm.submit();
                if (res) {
                  this.$router.back();
                }
              }}
            >
              {this.scope.locale.Submit()}
            </button>
          )}
          <button
            class={classes('btn', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
            onClick={() => {
              this.$router.back();
            }}
          >
            {this.scope.locale.Back()}
          </button>
        </div>
      </div>
    );
  }
}
