import type { BeanBase, BeanContainer, IMonkeyBeanInit } from 'zova';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IActionRecord } from './types/action.js';
import { BeanSimple, cast } from 'zova';
import { $performAction } from './lib/performAction.js';

export class Monkey extends BeanSimple implements IMonkeyBeanInit {
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$performAction', {
      enumerable: false,
      configurable: true,
      get() {
        return function<T extends keyof IActionRecord>(
          actionName: T,
          options: Partial<IActionRecord[T]> | undefined,
          renderContext?: IJsxRenderContextBase,
          next?: Function,
        ) {
          renderContext = Object.assign({
            app: cast(beanInstance).app,
            ctx: cast(beanInstance).ctx,
            $host: beanInstance,
          }, renderContext);
          return $performAction(actionName, options, renderContext, next);
        };
      },
    });
  }
}
