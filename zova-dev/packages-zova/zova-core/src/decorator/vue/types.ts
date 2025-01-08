export const DecoratorVue = Symbol('Decorator#Vue');

export type TypeDecoratorVue = 'computed';
export interface IDecoratorVueOptions {
  type: TypeDecoratorVue;
  descriptor: PropertyDescriptor;
}
