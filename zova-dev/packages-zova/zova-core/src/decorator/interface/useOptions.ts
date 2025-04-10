import type { IBeanRecord, IBeanScopeRecord } from '../../bean/type.js';
import type { MetadataKey } from '../../core/sys/metadata.js';
import type { Constructable } from '../type/constructable.js';
import type { Functionable } from '../type/functionable.js';
import type { InjectionScope } from '../type/injectionScope.js';

export interface IDecoratorUseOptionsBase<T = unknown> {
  prop: MetadataKey;
  beanFullName?: string;
  name?: string;
  beanClass?: Constructable<T>;
  beanComposable?: Functionable;
  /** such as: moduleScope */
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
  init?: IDecoratorUseOptionsInit;
  descriptor?: PropertyDescriptor;
}

export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  name?: string;
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
  init?: IDecoratorUseOptionsInit;
}

export interface IDecoratorUseComposableOptions {
  beanComposable?: Functionable;
  name?: string;
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
  init?: IDecoratorUseOptionsInit;
}

export interface IDecoratorUseScopeOptions {
  module?: keyof IBeanScopeRecord;
}

export type TypeDecoratorUseOptionsInitArg = any | any[] | Record<string, any>;
export interface IDecoratorUseOptionsInit {
  withSelector?: boolean;
  markReactive?: boolean;
  arg?: TypeDecoratorUseOptionsInitArg;
  args?: TypeDecoratorUseOptionsInitArg[];
}

export interface IUsePrepareArgResult {
  withSelector?: boolean;
  markReactive?: boolean;
  fns: Function[];
}

export interface IInjectSelectorInfo {
  withSelector: boolean;
  args: any[];
}
