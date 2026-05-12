import { Command, ICommandExecute, ICommandRowOptionsBase, NextCommandExecute } from 'zova-module-a-command';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanCommandRowBase } from '../lib/beanCommandRowBase.js';

export type TypeCommandDeleteResult = number;

export interface ICommandOptionsDelete extends ICommandRowOptionsBase<TypeCommandDeleteResult> {}

@Command<ICommandOptionsDelete>()
export class CommandDelete extends BeanCommandRowBase implements ICommandExecute {
  async execute(options: ICommandOptionsDelete, renderContext: IJsxRenderContextBase, next: NextCommandExecute) {
    const { ctx } = renderContext;
    const { resource, id } = this.getResourceAndId(options, renderContext);
    const modelResource = await ctx.bean._getBeanSelector('rest-resource.model.resource', true, resource);
    const mutation = modelResource.delete(id);
    await mutation.mutateAsync();
    return next();
  }
}
