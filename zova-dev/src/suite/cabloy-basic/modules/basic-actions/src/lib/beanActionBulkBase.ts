import { BeanBase } from 'zova';
import { IJsxRenderContextBase, IJsxRenderContextPage, IPerformActionBulkOptionsBase } from 'zova-module-a-openapi';

export class BeanActionBulkBase extends BeanBase {
  getResource(options: IPerformActionBulkOptionsBase, renderContext: IJsxRenderContextBase) {
    let resource: string | undefined = options.resource;
    if (renderContext.$scene === 'page') {
      const { $celScope } = renderContext as IJsxRenderContextPage;
      resource = resource ?? $celScope.resource;
    }
    if (!resource) {
      throw new Error(`should specify resource in scene: ${renderContext.$scene}`);
    }
    return { resource };
  }
}
