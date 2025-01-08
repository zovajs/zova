export const DecoratorVue = Symbol('Decorator#Vue');

export type TypeDecoratorVue = 'computed' | 'emit';
export interface IDecoratorVueOptions<OPTIONS = any> {
  type: TypeDecoratorVue;
  descriptor: PropertyDescriptor;
  options?: OPTIONS;
}
