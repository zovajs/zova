import { isNil } from '@cabloy/utils';
import { TableIdentity } from 'table-identity';
import { BeanBase } from 'zova';
import { ICommandRowOptionsBase } from 'zova-module-a-command';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell } from 'zova-module-a-table';

export class BeanCommandRowBase extends BeanBase {
  getResourceAndId(options: ICommandRowOptionsBase, renderContext: IJsxRenderContextBase) {
    let resource: string | undefined = options.resource;
    let id: TableIdentity | undefined = options.id;
    if (renderContext.$scene === 'tableCell') {
      const { $celScope, cellContext } = renderContext as IJsxRenderContextTableCell;
      resource = resource ?? $celScope.resource;
      id = id ?? cellContext.row.id;
    }
    if (isNil(resource) || isNil(id)) {
      throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    }
    return { resource, id };
  }
}
