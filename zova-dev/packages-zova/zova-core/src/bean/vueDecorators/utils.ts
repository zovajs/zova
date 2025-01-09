import { shallowReactive } from 'vue';

const SymbolVueDecorators = Symbol('Bean#SymbolVueDecorators');

export function getVueDecoratorValues(beanInstance) {
  if (!beanInstance[SymbolVueDecorators]) {
    beanInstance[SymbolVueDecorators] = shallowReactive({});
  }
  return beanInstance[SymbolVueDecorators];
}

export function getVueDecoratorValue(beanInstance, prop: string, index: number, fn?: Function) {
  const key = `${prop}:${index}`;
  const values = getVueDecoratorValues(beanInstance);
  if (!values[key] && fn) {
    values[key] = fn();
  }
  return values[key];
}

export function setVueDecoratorValue(beanInstance, prop: string, index: number, value: any) {
  const key = `${prop}:${index}`;
  const values = getVueDecoratorValues(beanInstance);
  values[key] = value;
}
