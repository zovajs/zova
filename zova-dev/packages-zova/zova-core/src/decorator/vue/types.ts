import { WatchEffectOptions, WatchOptions } from 'vue';

export const DecoratorVueElements = Symbol('Decorator#Vue');

export type TypeDecoratorVue = 'computed' | 'emit' | 'watch' | 'watchEffect' | 'raw' | 'shallow';
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
