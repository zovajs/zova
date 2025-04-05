import type { WatchEffectOptions, WatchOptions } from 'vue';

export const SymbolDecoratorVueElements = Symbol('SymbolDecoratorVueElements');

export type TypeDecoratorVue =
  | 'computed'
  | 'emit'
  | 'watch'
  | 'watchEffect'
  | 'raw'
  | 'shallow'
  | 'readonly'
  | 'shallowReadonly'
  | 'model'
  | 'controllerMounted';

export interface IDecoratorVueElement<OPTIONS = any> {
  type: TypeDecoratorVue;
  descriptor: PropertyDescriptor;
  options?: OPTIONS;
}

export interface IDecoratorVueEmitOptions {
  eventName?: string;
}

export interface IDecoratorVueWatchOptions {
  path?: string;
  watchOptions?: WatchOptions;
}

export interface IDecoratorVueWatchEffectOptions {
  watchEffectOptions?: WatchEffectOptions;
}

export interface IDecoratorVueModelOptions {
  modelName?: string;
}
