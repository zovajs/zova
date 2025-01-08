import { IDecoratorVueOptions } from '../../decorator/vue/types.js';
import { useComputed } from '../../vue/computed.js';
import { getVueDecoratorValues } from './utils.js';

export function computed(beanInstance, beanFullName: string, prop: string, decoratorVueOptions: IDecoratorVueOptions) {
  const { descriptor } = decoratorVueOptions;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      const values = getVueDecoratorValues(beanInstance);
      if (!values[prop]) {
        values[prop] = useComputed(() => {
          return descriptor.get?.apply(beanInstance);
        });
      }
      return values[prop];
    },
    set(value) {
      if (!descriptor.set) throw new Error(`setter method not found: ${beanFullName}:${prop}`);
      descriptor.set.call(beanInstance, value);
      return true;
    },
  });
}
