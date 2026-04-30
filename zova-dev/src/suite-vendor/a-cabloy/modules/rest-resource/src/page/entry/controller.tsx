import { celEnvBase, isNil } from '@cabloy/utils';
import { z } from 'zod';
import { BeanControllerPageBase, Use, useCustomRef, usePrepareArg } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { formMetaFromFormScene, IFormMeta, IFormProvider, TypeFormScene } from 'zova-module-a-form';
import { IResourceActionBulkRecord, IResourceActionRowRecord } from 'zova-module-a-openapi';
import { ZPage } from 'zova-module-home-base';

import type { ModelResource } from '../../model/resource.js';

import { IJsxRenderContextPageEntryWrapper, IPageEntryWrapperScope } from '../../types/pageEntryWrapper.js';

export const ControllerPageEntrySchemaParams = z.object({
  resource: z.string(),
  id: z.string().optional(),
  formScene: z.string().optional(),
});

@Controller()
export class ControllerPageEntry extends BeanControllerPageBase {
  formMeta: IFormMeta;
  formProvider: IFormProvider;
  pageEntryWrapperScope: IPageEntryWrapperScope;
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
    this.formProvider = this.$useComputed(() => {
      return this.$$modelResource.formProvider;
    });
    this.pageEntryWrapperScope = this._getPageEntryWrapperScope();
    // jsx
    this.pageEntryWrapperCelEnv = this._getPageEntryWrapperCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.formProvider.components, this.formProvider.actions, this.pageEntryWrapperCelEnv);
  }

  async onActionBulk(_action: keyof IResourceActionBulkRecord) {}

  async onActionRow(action: keyof IResourceActionRowRecord) {
    if (!this.entryId) return;
    if (action === 'delete') {
      const mutation = this.$$modelResource.delete(this.entryId);
      await mutation.mutateAsync();
    }
  }

  private _getPageEntryWrapperScope(): IPageEntryWrapperScope {
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
      onActionBulk: (action: keyof IResourceActionBulkRecord) => {
        return this.onActionBulk(action);
      },
      onActionRow: (action: keyof IResourceActionRowRecord) => {
        return this.onActionRow(action);
      },
    };
  }

  private _getPageEntryWrapperCelEnv(): typeof celEnvBase {
    const celEnv = celEnvBase.clone();
    return celEnv;
  }

  public getJsxRenderContextPageEntryWrapper(celScope: IPageEntryWrapperScope): IJsxRenderContextPageEntryWrapper {
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
    const componentRestPageEntry = this.$$modelResource.componentRestPageEntry;
    if (!componentRestPageEntry) {
      return <ZPage>not found componentRestPageEntry</ZPage>;
    }
    const celScope = this.pageEntryWrapperScope;
    const jsxRenderContext = this.getJsxRenderContextPageEntryWrapper(celScope);
    const domRestPageEntry = this.zovaJsx.render(componentRestPageEntry, {}, celScope, jsxRenderContext);
    return <ZPage>{domRestPageEntry}</ZPage>;
  }
}
