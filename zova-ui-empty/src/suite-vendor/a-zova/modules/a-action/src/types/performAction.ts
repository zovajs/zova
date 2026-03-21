import type { IJsxRenderContextBase } from 'zova-module-a-openapi';

import type { IActionRecord, SymbolActionResult } from './action.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $performAction: <T extends keyof IActionRecord>(
      actionName: T,
      options: Partial<IActionRecord[T]> | undefined,
      renderContext?: IJsxRenderContextBase,
      next?: Function,
    ) => IActionRecord[T][typeof SymbolActionResult];
  }
}
