import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export interface IBeanSceneRecord {}

export interface IDecoratorBeanOptionsBase<T = unknown, OPTIONS = unknown> {
  /**
   * global: module.scene.name
   * others: undefined: use beanClass
   */
  beanFullName: string;
  module: string;
  scene?: keyof IBeanSceneRecord;
  name: string;
  beanClass: Constructable<T>;
  containerScope?: ContainerScope;
  markReactive?: boolean;
  // todo: remove
  aop?: boolean;
  aopMatch?: string | RegExp | (string | RegExp)[];
  virtual?: boolean;
  moduleBelong?: string;
  options?: OPTIONS;
  optionsPrimitive?: boolean;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanInfoOptions {
  module: string;
}

// todo: remove
export interface IDecoratorAopOptions {
  name?: string;
  match: string | RegExp | (string | RegExp)[];
}
