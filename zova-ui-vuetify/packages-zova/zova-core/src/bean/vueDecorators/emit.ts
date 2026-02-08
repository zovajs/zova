import type { IDecoratorVueElement, IDecoratorVueEmitOptions } from '../../decorator/vueExtra/types.js';
import { isPromise } from '@cabloy/utils';
import { toLowerCaseFirstChar, toUpperCaseFirstChar } from '@cabloy/word-utils';
import { getVueDecoratorValue } from './utils.js';

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

function __emitHandler(
  returnValue: any,
  args: any[],
  beanInstance,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueEmitOptions>,
) {
  // eventName
  let eventName = vueElement.options?.eventName;
  if (!eventName) {
    if (prop.startsWith('emit')) {
      eventName = toLowerCaseFirstChar(prop.substring('emit'.length));
    } else {
      eventName = prop;
    }
  }
  // func
  const propName = `on${toUpperCaseFirstChar(eventName)}`;
  const func = beanInstance.$props?.[propName];
  if (!func) return;
  // emit
  if (returnValue === undefined) {
    func(...args);
  } else {
    func(returnValue, ...args);
  }
  // return
  return returnValue;
}
