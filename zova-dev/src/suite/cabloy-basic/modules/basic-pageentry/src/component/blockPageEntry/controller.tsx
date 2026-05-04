import type { IFormMeta, IResourceBlockOptionsPageEntry, TypeFormScene, TypeFormSchemaScene } from 'zova-module-a-openapi';

import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanControllerBase, deepEqual, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, formMetaFromFormScene, IFormProvider } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { ModelResource } from 'zova-module-rest-resource';

export interface ControllerBlockPageEntryProps extends IResourceBlockOptionsPageEntry {}

@Controller()
export class ControllerBlockPageEntry<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  controllerForm: ControllerForm;

  formMeta: IFormMeta;
  formSchema?: SchemaObject;
  formProvider: IFormProvider;
  formData?: TData;

  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.$$modelResource = await this.bean._getBeanSelector('rest-resource.model.resource', true, this.resource);
    this.formMeta = this.$useComputed(() => {
      const formScene = this.formScene;
      return { ...formMetaFromFormScene(formScene), formScene };
    });
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$modelResource.formProvider;
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

  get resource() {
    return this.$props.resource;
  }

  get entryId() {
    return this.$props.id;
  }

  get formScene() {
    return (this.$props.formScene as TypeFormScene | undefined) ?? (isNil(this.entryId) ? 'create' : 'view');
  }

  get schemaScene(): TypeFormSchemaScene {
    if (this.formMeta.formMode === 'view') return 'form-view';
    if (this.formMeta.editMode === 'create') return 'form-create';
    return 'form';
  }

  get pageEntryScope(): IPageEntryScope {
    return this.$$pageEntryWrapper.pageEntryWrapperScope;
  }

  get zovaJsx() {
    return this.$$pageEntryWrapper.zovaJsx;
  }

  get pageEntryCelEnv(): typeof celEnvBase {
    return this.$$pageEntryWrapper.pageEntryWrapperCelEnv;
  }

  public getJsxRenderContextPageEntry(celScope: IPageEntryScope): IJsxRenderContextPageEntry<TData> {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'pageEntry',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageEntry: this,
    };
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

  protected render() {
    console.log(this.$props);
    console.log(this.$style(undefined));
    return null;
  }
}
