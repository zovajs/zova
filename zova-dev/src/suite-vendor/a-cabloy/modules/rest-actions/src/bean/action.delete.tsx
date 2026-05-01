import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanActionRowBase } from '../lib/beanActionRowBase.js';
import { IActionOptionsRowBase } from '../types/actions.js';

export type TypeActionDeleteResult = number;

export interface IActionOptionsDelete extends IActionOptionsRowBase<TypeActionDeleteResult> {}

@Action<IActionOptionsDelete>()
export class ActionDelete extends BeanActionRowBase implements IActionExecute {
  async execute(options: IActionOptionsDelete, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { ctx } = renderContext;
    const { resource, id } = this.getResourceAndId(options, renderContext);
    const modelResource = await ctx.bean._getBeanSelector('rest-resource.model.resource', true, resource);
    const mutation = modelResource.delete(id);
    await mutation.mutateAsync();
    return next();
  }
}
