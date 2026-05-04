import { VNode } from 'vue';
import { z } from 'zod';
import { BeanControllerPageBase, deepExtend, Use, usePrepareArg } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { ITableProvider } from 'zova-module-a-table';
import { IResourceBlockOptionsPage } from 'zova-module-basic-openapi';
import { ZPage } from 'zova-module-home-base';

import type { ModelResource } from '../../model/resource.js';

export const ControllerPageResourceSchemaParams = z.object({
  resource: z.string(),
});

@Controller()
export class ControllerPageResource extends BeanControllerPageBase {
  tableProvider: ITableProvider;

  jsxZova: ZovaJsx;

  @Use({ beanFullName: 'rest-resource.model.resource' })
  get $$modelResource(): ModelResource {
    return usePrepareArg(this.$params.resource, true);
  }

  get resource() {
    return this.$params.resource;
  }

  protected async __init__() {
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    // jsx
    this._prepareJsx();
    // load schema/data
    await $QueryAutoLoad(() => this.$$modelResource.apiSchemasSelect.sdk);
  }

  private _prepareJsx() {
    this.jsxZova = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions);
  }

  get schemaRow() {
    return this.$$modelResource.schemaRow;
  }

  public render() {
    const blocks = this.schemaRow?.rest?.blocks;
    if (!blocks || blocks.length === 0) return;
    let domBlocks: VNode[] = [];
    blocks.forEach((block, index) => {
      const options = deepExtend(
        { key: index },
        {
          resource: this.resource,
        } satisfies IResourceBlockOptionsPage,
        block.options,
      );
      const domBlock = this.jsxZova.render(block.render!, options);
      if (!domBlock) return;
      if (Array.isArray(domBlock)) {
        domBlocks.push(...domBlock);
      } else {
        domBlocks.push(domBlock);
      }
    });
    return <ZPage>{domBlocks}</ZPage>;
  }
}
