import type { IDecoratorVueElement, IDecoratorVueModelOptions } from '../../decorator/vue/types.js';
import type { BeanContainer } from '../beanContainer.js';
import type { DefineModelOptions } from '../type.js';
import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { useModel } from 'vue';
import { cast } from '../../types/utils/cast.js';
import { getVueDecoratorValue } from './utils.js';

export function model(
  this: BeanContainer,
  beanInstance,
  _beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueModelOptions>,
  index: number,
) {
  const self = this;
  const { descriptor } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        // modelName
        let modelName = vueElement.options?.modelName;
        if (!modelName) {
          if (prop === 'modelValue') {
            modelName = prop;
          } else {
            if (prop.startsWith('model')) {
              modelName = toLowerCaseFirstChar(prop.substring('model'.length));
            } else {
              modelName = prop;
            }
          }
        }
        // options
        const useModelOptions: DefineModelOptions = {};
        if (descriptor.get) {
          useModelOptions.get = value => {
            return cast(descriptor.get!).call(beanInstance, value);
          };
        }
        if (descriptor.set) {
          useModelOptions.set = value => {
            return descriptor.set!.call(beanInstance, value);
          };
        }
        return self.runWithInstanceScopeOrAppContext(() => {
          return useModel(beanInstance.$props, modelName, useModelOptions);
        });
      });
    },
  });
}
