import { celEnvBase, isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { z } from 'zod';
import { BeanControllerPageBase, Use, useCustomRef, usePrepareArg } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { formMetaFromFormScene, IFormProvider } from 'zova-module-a-form';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { IFormMeta, IJsxRenderContextPageEntryWrapper, IPageEntryWrapperScope, TypeFormScene } from 'zova-module-a-openapi';

import type { ModelResource } from '../../model/resource.js';

export const ControllerPageEntrySchemaParams = z.object({
  resource: z.string(),
  id: z.string().optional(),
  formScene: z.string().optional(),
});

@Controller()
export class ControllerPageEntry extends BeanControllerPageBase {
  formMeta: IFormMeta;
  formSchema?: SchemaObject;
  formProvider: IFormProvider;
  pageEntryWrapperScope: IPageEntryWrapperScope;
  jsxRenderContext: IJsxRenderContextPageEntryWrapper;
  zovaJsx: ZovaJsx;
  pageEntryWrapperCelEnv: typeof celEnvBase;

  @Use({ beanFullName: 'rest-resource.model.resource' })
  get $$modelResource(): ModelResource {
    return usePrepareArg(this.$params.resource, true);
  }

  get resource() {
    return this.$params.resource;
  }

  get entryId() {
    return this.$params.id;
  }

  get formScene() {
    return (this.$params.formScene as TypeFormScene | undefined) ?? (isNil(this.entryId) ? 'create' : 'view');
  }

  protected async __init__() {
    this.bean._setBean('$$pageEntryWrapper', this);
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
    // jsx
    this.pageEntryWrapperCelEnv = this._getPageEntryWrapperCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.formProvider.components, this.formProvider.actions, this.pageEntryWrapperCelEnv);
    this.pageEntryWrapperScope = this._getPageEntryWrapperScope();
    this.jsxRenderContext = this._getJsxRenderContextPageEntryWrapper(this.pageEntryWrapperScope);
    // load schema
    await $QueriesAutoLoad(() => this.$$modelResource.getFormApiSchemas(this.formMeta)?.sdk);
  }

  private _getPageEntryWrapperScope(): IPageEntryWrapperScope {
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
      resource: this.$params.resource,
      id: this.entryId,
      permissions,
    };
  }

  private _getPageEntryWrapperCelEnv(): typeof celEnvBase {
    const celEnv = celEnvBase.clone();
    return celEnv;
  }

  public _getJsxRenderContextPageEntryWrapper(celScope: IPageEntryWrapperScope): IJsxRenderContextPageEntryWrapper {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'pageEntryWrapper',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageEntryWrapper: this,
    };
  }

  protected render() {
    const celScope = this.pageEntryWrapperScope;
    const jsxRenderContext = this.jsxRenderContext;
    const blocks = this.formSchema?.rest?.blocks;
    if (!blocks || blocks.length === 0) return;
    let domBlocks: VNode[] = [];
    blocks.forEach((block, index) => {
      const options = Object.assign({ key: index }, block);
      const domBlock = this.zovaJsx.render(options.render!, options, celScope, jsxRenderContext);
      if (!domBlock) return;
      if (Array.isArray(domBlock)) {
        domBlocks.push(...domBlock);
      } else {
        domBlocks.push(domBlock);
      }
    });
    return <div>{domBlocks}</div>;
    // const componentRestPageEntry = this.$$modelResource.componentRestPageEntry;
    // if (!componentRestPageEntry) {
    //   return <ZPage>not found componentRestPageEntry</ZPage>;
    // }
    // const celScope = this.pageEntryWrapperScope;
    // const jsxRenderContext = this.getJsxRenderContextPageEntryWrapper(celScope);
    // const domRestPageEntry = this.zovaJsx.render(componentRestPageEntry, {}, celScope, jsxRenderContext);
    // return <ZPage>{domRestPageEntry}</ZPage>;
  }
}
