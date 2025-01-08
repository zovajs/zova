import { WatchOptions } from 'vue';

export const DecoratorVueElements = Symbol('Decorator#Vue');

export type TypeDecoratorVue = 'computed' | 'emit' | 'watch';
export interface IDecoratorVueElement<OPTIONS = any> {
  type: TypeDecoratorVue;
  descriptor: PropertyDescriptor;
  options?: OPTIONS;
}

export interface IDecoratorVueWatchOptions {
  path?: string;
  watchOptions?: WatchOptions;
}
