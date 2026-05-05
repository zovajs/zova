import { isNil } from '@cabloy/utils';
import { TableIdentity } from 'table-identity';
import { BeanBase } from 'zova';
import { IJsxRenderContextBase, IPerformActionRowOptionsBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell } from 'zova-module-a-table';

export class BeanActionRowBase extends BeanBase {
  getResourceAndId(options: IPerformActionRowOptionsBase, renderContext: IJsxRenderContextBase) {
    let resource: string | undefined;
    let id: TableIdentity | undefined;
    if (renderContext.$scene === 'tableCell') {
      const { $celScope, cellContext } = renderContext as IJsxRenderContextTableCell;
      resource = options.resource ?? $celScope.resource;
      id = options.id ?? cellContext.row.id;
    }
    if (isNil(resource) || isNil(id)) {
      throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    }
    return { resource, id };
  }
}
