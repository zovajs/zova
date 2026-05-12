import { Command, ICommandBulkOptionsBase, ICommandExecute, NextCommandExecute } from 'zova-module-a-command';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

import { BeanCommandBulkBase } from '../lib/beanCommandBulkBase.js';

export type TypeCommandCreateResult = unknown;

export interface ICommandOptionsCreate extends ICommandBulkOptionsBase<TypeCommandCreateResult> {
  replace?: boolean;
}

@Command<ICommandOptionsCreate>()
export class CommandCreate extends BeanCommandBulkBase implements ICommandExecute {
  execute(options: ICommandOptionsCreate, renderContext: IJsxRenderContextBase, next: NextCommandExecute) {
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
