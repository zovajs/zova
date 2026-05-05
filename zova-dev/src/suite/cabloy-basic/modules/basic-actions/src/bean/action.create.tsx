import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';
import { IPerformActionOptionsCreate } from 'zova-module-basic-openapi';

import { BeanActionBulkBase } from '../lib/beanActionBulkBase.js';

export type TypeActionCreateResult = unknown;

export interface IActionOptionsCreate extends IPerformActionOptionsCreate<TypeActionCreateResult> {}

@Action<IActionOptionsCreate>()
export class ActionCreate extends BeanActionBulkBase implements IActionExecute {
  execute(options: IActionOptionsCreate, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { $host } = renderContext;
    const { resource } = this.getResource(options, renderContext);
    const url = $host.$router.getPagePath('/rest/resource/:resource/create', {
      params: { resource },
    });
    if (options.replace) {
      $host.$router.replace(url);
    } else {
      $host.$router.push(url);
    }
    return next();
  }
}
