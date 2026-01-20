import type { IRenderContextBase } from 'zova-module-a-openapi';
import type { IActionRecord, SymbolActionResult } from '../types/action.js';
import { beanFullNameFromOnionName, deepExtend, useSys } from 'zova';

export function $performAction<T extends keyof IActionRecord>(
  actionName: T,
  options: Partial<IActionRecord[T]> | undefined,
  renderContext: IRenderContextBase,
  next?: Function,
): IActionRecord[T][typeof SymbolActionResult] {
  const sys = useSys();
  if (!next) {
    next = actionRes => {
      return actionRes;
    };
  }
  // action
  const beanFullName = beanFullNameFromOnionName(actionName, 'action');
  const beanInstance = sys.bean._getBeanSyncOnly(beanFullName);
  if (beanInstance) {
    // sync
    return _renderEventActionNormal_inner(beanInstance, options, renderContext, next);
  }
  // async
  return sys.bean._getBean(beanFullName, false).then(beanInstance => {
    return _renderEventActionNormal_inner(beanInstance, options, renderContext, next);
  });
}

function _renderEventActionNormal_inner(
  beanInstance: any,
  options: {} | undefined,
  renderContext: IRenderContextBase,
  next?: Function,
) {
  const onionOptions = beanInstance.$onionOptions;
  // props
  const props = onionOptions ? deepExtend({}, onionOptions, options) : (options ?? {});
  return beanInstance.execute(props, renderContext, next);
}
