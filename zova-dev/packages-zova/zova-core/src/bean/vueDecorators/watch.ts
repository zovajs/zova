import type { IDecoratorVueElement, IDecoratorVueWatchOptions } from '../../decorator/vue/types.js';
import { getProperty } from '@cabloy/utils';
import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { watch as vueWatch } from 'vue';
import { getVueDecoratorValue } from './utils.js';

export function watch(
  beanInstance,
  _beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchOptions>,
  index: number,
) {
  const { descriptor, options } = vueElement;
  // getter
  let keySource = `${prop}Source`;
  let getter;
  if (options?.path) {
    getter = () => {
      return getProperty(beanInstance, options.path!, '.');
    };
  } else if (beanInstance[keySource]) {
    getter = () => {
      return beanInstance[keySource]();
    };
  } else {
    if (prop.startsWith('watch')) {
      keySource = toLowerCaseFirstChar(prop.substring('watch'.length));
    } else {
      keySource = prop;
    }
    getter = () => {
      return beanInstance[keySource];
    };
  }
  // watch
  getVueDecoratorValue(beanInstance, prop, index, () => {
    return vueWatch(
      getter,
      (newValue, oldValue) => {
        descriptor.value.call(beanInstance, newValue, oldValue);
      },
      options?.watchOptions,
    );
  });
}
