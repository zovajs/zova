import type { IFormMeta, IJsxRenderContextPageEntry, IPageEntryScope, TypeFormScene, TypeFormSchemaScene } from 'zova-module-a-openapi';

import { celEnvBase, isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { BeanControllerBase, deepEqual, IComponentOptions, useCustomRef } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerFormBase, formMetaFromFormScene, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { IResourceBlockOptionsPageEntry } from 'zova-module-basic-openapi';
import { ModelResource } from 'zova-module-rest-resource';

export interface ControllerBlockPageEntryProps extends IResourceBlockOptionsPageEntry {}

@Controller()
export class ControllerBlockPageEntry<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  formInstance: BeanControllerFormBase;

  formMeta: IFormMeta;
  formProvider: IFormProvider;
  formSchema?: SchemaObject;
  formData?: TData;

  jsxZova: ZovaJsx;
  jsxCelScope: IPageEntryScope;
  jsxRenderContext: IJsxRenderContextPageEntry<TData>;

  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.$$modelResource = await this.bean._getBeanSelector('rest-resource.model.resource', true, this.resource);
    this.formMeta = this.$useComputed(() => {
      const formScene = this.formScene;
      return { ...formMetaFromFormScene(formScene), formScene };
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$modelResource.formProvider;
    });
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$modelResource.getFormData(this.formMeta, this.entryId) as TData | undefined;
    });
    // jsx
    this._prepareJsx();
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

  get queryData() {
    if (isNil(this.entryId)) return;
    return this.$$modelResource.view(this.entryId);
  }

  private _prepareJsx() {
    const jsxCelEnv = celEnvBase.clone();
    this.jsxZova = this.app.bean._newBeanSimple(ZovaJsx, false, this.formProvider.components, this.formProvider.actions, jsxCelEnv);
    this.jsxCelScope = this._prepareJsxCelScope();
    this.jsxRenderContext = {
      app: this.app,
      ctx: this.ctx,
      $scene: 'pageEntry',
      $host: this,
      $celScope: this.jsxCelScope,
      $jsx: this.jsxZova,
      $$pageEntry: this,
    };
  }

  private _prepareJsxCelScope(): IPageEntryScope {
    // eslint-disable-next-line
    const self = this;
    const permissions = useCustomRef(() => {
      return {
        get() {
          return self.$$modelResource.permissions;
        },
        set(_value) {},
      };
    }) as any;
    return {
      resource: this.resource,
      id: this.entryId ?? null,
      permissions,
    };
  }

  async submitData(data: TypeFormOnSubmitData<TData>) {
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
    if (!this.formData) {
      return <div>{this.scope.locale.EntryNotExist()}</div>;
    }
    return <div class={classes(this.$props.class, this.$style(this.$props.style))}>{this._renderFormWrapper()}</div>;
  }

  private _renderFormWrapper() {
    return (
      <form
        onSubmit={(e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.formInstance?.submit();
        }}
      >
        {this._renderBlocks()}
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    );
  }

  private _renderBlocks() {
    const blocks = this.$props.blocks;
    if (!blocks || blocks.length === 0) return;
    let domBlocks: VNode[] = [];
    blocks.forEach((block, index) => {
      const options = Object.assign({ key: index }, block.options);
      const domBlock = this.jsxZova.render(block.render!, options, this.jsxCelScope, this.jsxRenderContext);
      if (!domBlock) return;
      if (Array.isArray(domBlock)) {
        domBlocks.push(...domBlock);
      } else {
        domBlocks.push(domBlock);
      }
    });
    return domBlocks;
  }
}
