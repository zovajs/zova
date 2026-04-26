import { BeanBase } from 'zova';
import {
  Action,
  IActionExecute,
  IDecoratorActionOptions,
  NextActionExecute,
} from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IJsxRenderContextTableCell } from 'zova-module-a-table';

export type TypeActionEditResult = unknown;

export interface IActionOptionsEdit extends IDecoratorActionOptions<TypeActionEditResult> {
  resource?: string;
  id?: string;
}

@Action<IActionOptionsEdit>()
export class ActionEdit extends BeanBase implements IActionExecute {
  execute(
    options: IActionOptionsEdit,
    renderContext: IJsxRenderContextBase,
    next: NextActionExecute,
  ) {
    const { $host } = renderContext;
    let resource: string | undefined;
    let id: string | undefined;
    if (renderContext.$scene === 'tableCell') {
      const { $celScope, cellContext } = renderContext as IJsxRenderContextTableCell;
      resource = options.resource ?? $celScope.resource;
      id = options.id ?? cellContext.row.id;
    }
    if (!resource || !id)
      throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    const url = $host.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
      params: { resource, id, formScene: 'edit' },
    });
    $host.$router.push(url);
    return next();
  }
}
