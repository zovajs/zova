import { useModel } from 'vue';
import { IDecoratorVueElement, IDecoratorVueModelOptions } from '../../decorator/vue/types.js';
import { DefineModelOptions } from '../type.js';
import { getVueDecoratorValue } from './utils.js';
import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { cast } from '../../types/utils/cast.js';

export function model(
  beanInstance,
  _beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueModelOptions>,
  index: number,
) {
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
        return useModel(beanInstance.$props, modelName, useModelOptions);
      });
    },
  });
}
