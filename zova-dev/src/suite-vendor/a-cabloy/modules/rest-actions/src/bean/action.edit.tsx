import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanActionRowBase } from '../lib/beanActionRowBase.js';
import { IActionOptionsRowBase } from '../types/actions.js';

export type TypeActionEditResult = unknown;

export interface IActionOptionsEdit extends IActionOptionsRowBase<TypeActionEditResult> {}

@Action<IActionOptionsEdit>()
export class ActionEdit extends BeanActionRowBase implements IActionExecute {
  execute(options: IActionOptionsEdit, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { $host } = renderContext;
    const { resource, id } = this.getResourceAndId(options, renderContext);
    const url = $host.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
      params: { resource, id: id.toString(), formScene: 'edit' },
    });
    $host.$router.push(url);
    return next();
  }
}
