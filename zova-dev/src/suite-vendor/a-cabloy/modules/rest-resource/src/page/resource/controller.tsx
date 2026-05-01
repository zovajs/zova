import { celEnvBase } from '@cabloy/utils';
import { z } from 'zod';
import { BeanControllerPageBase, Use, useCustomRef, usePrepareArg } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { ITableProvider } from 'zova-module-a-table';
import { ZPage } from 'zova-module-home-base';

import type { ModelResource } from '../../model/resource.js';

import { IJsxRenderContextPageWrapper, IPageWrapperScope } from '../../types/pageWrapper.js';

export const ControllerPageResourceSchemaParams = z.object({
  resource: z.string(),
});

@Controller()
export class ControllerPageResource extends BeanControllerPageBase {
  tableProvider: ITableProvider;
  pageWrapperScope: IPageWrapperScope;
  zovaJsx: ZovaJsx;
  pageWrapperCelEnv: typeof celEnvBase;

  @Use({ beanFullName: 'rest-resource.model.resource' })
  get $$modelResource(): ModelResource {
    return usePrepareArg(this.$params.resource, true);
  }

  protected async __init__() {
    this.bean._setBean('$$pageWrapper', this);
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    this.pageWrapperScope = this._getPageWrapperScope();
    // jsx
    this.pageWrapperCelEnv = this._getPageWrapperCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions, this.pageWrapperCelEnv);
  }

  get resource() {
    return this.$params.resource;
  }

  private _getPageWrapperScope(): IPageWrapperScope {
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
      resource: this.$$modelResource.resource,
      permissions,
    };
  }

  private _getPageWrapperCelEnv(): typeof celEnvBase {
    const celEnv = celEnvBase.clone();
    return celEnv;
  }

  public getJsxRenderContextPageWrapper(celScope: IPageWrapperScope): IJsxRenderContextPageWrapper {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'pageWrapper',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageWrapper: this,
    };
  }

  public render() {
    const componentRestPage = this.$$modelResource.componentRestPage;
    if (!componentRestPage) {
      return <ZPage>not found componentRestPage</ZPage>;
    }
    const celScope = this.pageWrapperScope;
    const jsxRenderContext = this.getJsxRenderContextPageWrapper(celScope);
    const domRestPage = this.zovaJsx.render(componentRestPage, {}, celScope, jsxRenderContext);
    return <ZPage>{domRestPage}</ZPage>;
  }
}
