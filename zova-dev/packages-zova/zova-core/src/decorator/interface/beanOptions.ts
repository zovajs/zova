import type { Constructable } from '../index.js';
import type { ContainerScope } from '../index.js';

export interface IBeanSceneRecord {}

export interface IDecoratorBeanOptionsBase<T = unknown, OPTIONS = unknown> {
  /**
   * global: module.scene.name
   * others: undefined: use beanClass
   */
  beanFullName: string;
  module: string;
  scene: keyof IBeanSceneRecord;
  name: string;
  beanClass: Constructable<T>;
  containerScope?: ContainerScope;
  markReactive?: boolean;
  virtual?: boolean;
  moduleBelong?: string;
  options?: OPTIONS;
  optionsPrimitive?: boolean;
}

export interface IDecoratorBeanInfoOptions {
  module: string;
}
