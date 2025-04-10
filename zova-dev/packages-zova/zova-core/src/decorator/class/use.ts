import type { IBeanRecord } from '../../bean/type.js';
import type { MetadataKey } from '../../core/sys/metadata.js';
import type {
  Constructable,
  IDecoratorUseOptions,
  IDecoratorUseOptionsBase,
  IInjectSelectorInfo,
  IUsePrepareArgResult,
  TypeDecoratorUseOptionsInitArg,
} from '../index.js';
import { evaluateExpressions } from '@cabloy/utils';
import { appMetadata } from '../../core/sys/metadata.js';
import { appResource } from '../../core/sys/resource.js';
import { useRef } from '../../vueExtra/ref.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator & MethodDecorator;
export function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator & MethodDecorator;
export function Use(options?: IDecoratorUseOptions | string): PropertyDecorator & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { beanFullName: options } as unknown as IDecoratorUseOptions;
    }
    // beanClass
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanClass,
      descriptor,
    });
    // chech beanClass
    if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
      const moduleSource = appResource._getModuleName(beanClass);
      if (moduleSource) {
        window.setTimeout(() => {
          const moduleTarget = appResource._getModuleName(target.constructor as any);
          if (moduleSource !== moduleTarget) {
            console.error(
              `inject class should be imported by type, such as: import type { ${appResource._fixClassName(beanClass.name)} } from 'zova-module-xxx-xxx'`,
            );
          }
        }, 0);
      }
    }
  };
}

export function usePrepareArg(fn: () => any, withSelector?: boolean, markReactive?: boolean): any {
  return {
    withSelector,
    markReactive,
    fns: [fn],
  };
}

export function usePrepareArgs(fns: Array<() => any>, withSelector?: boolean, markReactive?: boolean): any {
  return {
    withSelector,
    markReactive,
    fns,
  };
}

export function __prepareInjectSelectorInfo(beanInstance, useOptions: IDecoratorUseOptionsBase): IInjectSelectorInfo {
  let withSelector = true;
  let args: any[] = [];
  let selectorInfo = __prepareInjectSelectorInfo_descriptor(beanInstance, useOptions);
  if (!selectorInfo) {
    selectorInfo = __prepareInjectSelectorInfo_init(beanInstance, useOptions);
  }
  if (selectorInfo) {
    withSelector = selectorInfo.withSelector;
    args = selectorInfo.args;
  }
  return { withSelector, args: withSelector ? [useOptions.selector, ...args] : args };
}

function __prepareInjectSelectorInfo_descriptor(
  beanInstance,
  useOptions: IDecoratorUseOptionsBase,
): IInjectSelectorInfo | undefined {
  const fnGet = useOptions.descriptor?.get;
  if (!fnGet) return;
  const res: IUsePrepareArgResult = fnGet.call(beanInstance);
  if (!res) return;
  const withSelector = res.withSelector ?? useOptions.selector !== undefined;
  const markReactive = res.markReactive ?? true;
  const args = res.fns.map(fn => (markReactive ? useRef(fn) : fn()));
  return { withSelector, args };
}

function __prepareInjectSelectorInfo_init(
  beanInstance,
  useOptions: IDecoratorUseOptionsBase,
): IInjectSelectorInfo | undefined {
  const init = useOptions.init;
  if (!init) return;
  const withSelector = init.withSelector ?? useOptions.selector !== undefined;
  const markReactive = init.markReactive ?? true;
  const _args = init.args ?? [init.arg];
  if (!_args) return;
  const args = _args.map(arg =>
    markReactive
      ? useRef(() => __prepareInjectSelectorInfo_init_arg(beanInstance, arg))
      : __prepareInjectSelectorInfo_init_arg(beanInstance, arg),
  );
  return { withSelector, args };
}

function __prepareInjectSelectorInfo_init_arg(beanInstance, arg: TypeDecoratorUseOptionsInitArg): any {
  return evaluateExpressions(arg, beanInstance);
}
