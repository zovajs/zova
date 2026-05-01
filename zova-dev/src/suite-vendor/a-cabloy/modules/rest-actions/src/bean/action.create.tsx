import { Action, IActionExecute, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanActionBulkBase } from '../lib/beanActionBulkBase.js';
import { IActionOptionsBulkBase } from '../types/actions.js';

export type TypeActionCreateResult = unknown;

export interface IActionOptionsCreate extends IActionOptionsBulkBase<TypeActionCreateResult> {}

@Action<IActionOptionsCreate>()
export class ActionCreate extends BeanActionBulkBase implements IActionExecute {
  execute(options: IActionOptionsCreate, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    const { $host } = renderContext;
    const { resource } = this.getResource(options, renderContext);
    const url = $host.$router.getPagePath('/rest/resource/:resource/create', {
      params: { resource },
    });
    $host.$router.push(url);
    return next();
  }
}
