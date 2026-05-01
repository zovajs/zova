import { TableIdentity } from 'table-identity';
import { BeanBase } from 'zova';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell } from 'zova-module-a-table';

import { IActionOptionsRowBase } from '../types/actions.js';

export class BeanActionRowBase extends BeanBase {
  getResourceAndId(options: IActionOptionsRowBase, renderContext: IJsxRenderContextBase) {
    let resource: string | undefined;
    let id: TableIdentity | undefined;
    if (renderContext.$scene === 'tableCell') {
      const { $celScope, cellContext } = renderContext as IJsxRenderContextTableCell;
      resource = options.resource ?? $celScope.resource;
      id = options.id ?? cellContext.row.id;
    }
    if (!resource || !id) {
      throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    }
    return { resource, id };
  }
}
