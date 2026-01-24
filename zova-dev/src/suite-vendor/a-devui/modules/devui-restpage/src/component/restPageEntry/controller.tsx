import type { ControllerPageEntry, ModelResource } from 'zova-module-rest-resource';
import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerRestPageEntryProps<TData extends {} = {}> {
  showFilter?: boolean;
}

@Controller()
export class ControllerRestPageEntry<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = { showFilter: true };

  controllerForm: ControllerForm<TData>;

  formSchema?: SchemaObject;
  formData?: TData;

  @Use({ injectionScope: 'host' })
  $$restPageEntry: ControllerPageEntry;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$modelResource.getFormData(this.formMeta, this.entryId) as TData | undefined;
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

  async onSubmit(data: TypeFormOnSubmitData<TData>) {
    const { formMeta, entryId } = this.$$restPageEntry;
    const mutationSubmit = this.$$modelResource.getFormMutationSubmit(formMeta, entryId);
    await mutationSubmit?.mutateAsync(data.value as any);
  }
}
