import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanActionRowBase } from '../lib/beanActionRowBase.js';
import { IActionOptionsRowBase } from '../types/actions.js';

export type TypeActionViewResult = unknown;

export interface IActionOptionsView extends IActionOptionsRowBase<TypeActionViewResult> {}

@Action<IActionOptionsView>()
export class ActionView extends BeanActionRowBase implements IActionExecute {
  execute(options: IActionOptionsView, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { $host } = renderContext;
    const { resource, id } = this.getResourceAndId(options, renderContext);
    const url = $host.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
      params: { resource, id: id.toString() },
    });
    $host.$router.push(url);
    return next();
  }
}
