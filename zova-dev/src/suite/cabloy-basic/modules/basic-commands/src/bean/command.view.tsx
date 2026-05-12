import { BeanCommandRowBase, Command, ICommandExecute, ICommandRowOptionsBase, NextCommandExecute } from 'zova-module-a-command';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeCommandViewResult = unknown;

export interface ICommandOptionsView extends ICommandRowOptionsBase<TypeCommandViewResult> {
  replace?: boolean;
}

@Command<ICommandOptionsView>()
export class CommandView extends BeanCommandRowBase implements ICommandExecute {
  execute(options: ICommandOptionsView, renderContext: IJsxRenderContextBase, next: NextCommandExecute) {
    const { resource, id } = this.getResourceAndId(options, renderContext);
    const { $host } = renderContext;
    const url = $host.$router.getPagePath('/rest/resource/:resource/:id/:formScene?', {
      params: { resource, id: id.toString() },
    });
    if (options.replace) {
      $host.$router.replace(url);
    } else {
      $host.$router.push(url);
    }
    return next();
  }
}
