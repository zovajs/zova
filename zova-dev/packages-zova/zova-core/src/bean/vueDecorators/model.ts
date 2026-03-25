import { toLowerCaseFirstChar } from '@cabloy/word-utils';

import type { IDecoratorVueElement, IDecoratorVueModelOptions } from '../../decorator/vueExtra/types.ts';
import type { BeanContainer } from '../beanContainer.ts';
import type { DefineModelOptions } from '../type.ts';

import { cast } from '../../types/utils/cast.ts';
import { useModel } from '../../vueExtra/useModel.ts';
import { getVueDecoratorValue } from './utils.ts';

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
          return useModel.call(beanInstance, beanInstance.$props, modelName, useModelOptions);
        });
      });
    },
  });
}
