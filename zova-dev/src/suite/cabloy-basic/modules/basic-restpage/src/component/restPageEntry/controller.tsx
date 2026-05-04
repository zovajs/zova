import type { ControllerPageEntry, ModelResource } from 'zova-module-rest-resource';

import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanControllerBase, deepEqual, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { TypeFormSchemaScene } from 'zova-module-a-openapi';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerRestPageEntryProps<TData extends {} = {}> {
  toolbarPosition?: 'top' | 'bottom';
}

@Controller()
export class ControllerRestPageEntry<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = { toolbarPosition: 'bottom' };

  controllerForm: ControllerForm<TData>;

  formSchema?: SchemaObject;
  formData?: TData;

  @Use({ injectionScope: 'host' })
  $$pageEntryWrapper: ControllerPageEntry;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.bean._setBean('$$pageEntry', this);
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
    this.setPageMeta(this.formData, false);
    this.$watch(
      () => this.formData,
      (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        this.setPageMeta(newValue, false);
      },
    );
  }

  // get formProvider() {
  //   return this.$$pageEntryWrapper.formProvider;
  // }

  // get pageEntryScope(): IPageEntryScope {
  //   return this.$$pageEntryWrapper.pageEntryWrapperScope;
  // }

  // get zovaJsx() {
  //   return this.$$pageEntryWrapper.zovaJsx;
  // }

  // get pageEntryCelEnv(): typeof celEnvBase {
  //   return this.$$pageEntryWrapper.pageEntryWrapperCelEnv;
  // }

  // public getJsxRenderContextPageEntry(celScope: IPageEntryScope): IJsxRenderContextPageEntry<TData> {
  //   return {
  //     app: this.app,
  //     ctx: this.ctx,
  //     $scene: 'pageEntry',
  //     $host: this,
  //     $celScope: celScope,
  //     $jsx: this.zovaJsx,
  //     $$pageEntry: this,
  //   };
  // }

  get resource() {
    return this.$$pageEntryWrapper.resource;
  }

  get entryId() {
    return this.$$pageEntryWrapper.entryId;
  }

  get formMeta() {
    return this.$$pageEntryWrapper.formMeta;
  }

  get schemaScene(): TypeFormSchemaScene {
    if (this.formMeta.formMode === 'view') return 'form-view';
    if (this.formMeta.editMode === 'create') return 'form-create';
    return 'form';
  }

  get queryData() {
    if (isNil(this.entryId)) return;
    return this.$$modelResource.view(this.entryId);
  }

  async onSubmit(data: TypeFormOnSubmitData<TData>) {
    const mutationSubmit = this.$$modelResource.getFormMutationSubmit(this.formMeta, this.entryId);
    await mutationSubmit?.mutateAsync(data.value as any);
    this.setPageMeta(data.value, false);
  }

  setPageMeta(data: any | undefined, pageDirty?: boolean) {
    if (!this.$pageRoute) return;
    const pageTitle = data?.name;
    this.$router.setPageMeta(this.$pageRoute, { pageTitle, pageDirty, formMeta: this.formMeta });
  }
}
