import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { IDecoratorVueElement } from '../../decorator/vue/types.js';
import { getVueDecoratorValue } from './utils.js';
import { isPromise } from '@cabloy/utils';

export function emit(
  beanInstance,
  _beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement,
  index: number,
) {
  const { descriptor } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return function (...args: any[]) {
          const returnValue = descriptor.value.apply(beanInstance, args);
          if (isPromise(returnValue)) {
            return returnValue.then(returnValue => {
              return __emitHandler(returnValue, args, beanInstance, prop, vueElement);
            });
          } else {
            return __emitHandler(returnValue, args, beanInstance, prop, vueElement);
          }
        };
      });
    },
  });
}

function __emitHandler(returnValue: any, args: any[], beanInstance, prop: string, vueElement: IDecoratorVueElement) {
  // eventName
  let eventName = vueElement.options;
  if (!eventName) {
    if (prop.startsWith('emit')) {
      eventName = toLowerCaseFirstChar(prop.substring('emit'.length));
    } else {
      eventName = prop;
    }
  }
  // emit
  if (returnValue === undefined) {
    beanInstance['$emit'](eventName, ...args);
  } else {
    beanInstance['$emit'](eventName, returnValue, ...args);
  }
  // return
  return returnValue;
}
