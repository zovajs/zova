import { BeanBase } from 'zova';
import { Action, IActionExecute, IDecoratorActionOptions, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IJsxRenderContextPageWrapper } from 'zova-module-rest-resource';

export type TypeActionCreateResult = unknown;

export interface IActionOptionsCreate extends IDecoratorActionOptions<TypeActionCreateResult> {
  resource?: string;
}

@Action<IActionOptionsCreate>()
export class ActionCreate extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsCreate, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { $host } = renderContext;
    let resource: string | undefined;
    if (renderContext.$scene === 'page') {
      const { $celScope } = renderContext as IJsxRenderContextPageWrapper;
      resource = options.resource ?? $celScope.resource;
    }
    if (!resource) throw new Error(`should specify resource in scene: ${renderContext.$scene}`);
    const url = $host.$router.getPagePath('/rest/resource/:resource/create', {
      params: { resource },
    });
    $host.$router.push(url);
    return next();
  }
}
