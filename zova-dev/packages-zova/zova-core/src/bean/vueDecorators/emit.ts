import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { isPromise } from '../../core/app/utilsShared.js';
import { IDecoratorVueOptions } from '../../decorator/vue/types.js';
import { getVueDecoratorValues } from './utils.js';

export function computed(beanInstance, _beanFullName: string, prop: string, decoratorVueOptions: IDecoratorVueOptions) {
  const { descriptor } = decoratorVueOptions;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      const values = getVueDecoratorValues(beanInstance);
      if (!values[prop]) {
        values[prop] = function (...args: any[]) {
          const returnValue = descriptor.value.apply(beanInstance, args);
          if (isPromise(returnValue)) {
            return returnValue.then(returnValue => {
              return __emitHandler(returnValue, args, beanInstance, prop, decoratorVueOptions);
            });
          } else {
            return __emitHandler(returnValue, args, beanInstance, prop, decoratorVueOptions);
          }
        };
      }
      return values[prop];
    },
  });
}

function __emitHandler(
  returnValue: any,
  args: any[],
  beanInstance,
  prop: string,
  decoratorVueOptions: IDecoratorVueOptions,
) {
  // eventName
  let eventName = decoratorVueOptions.options;
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
