import { shallowReactive } from 'vue';

const SymbolVueDecorators = Symbol('Bean#SymbolVueDecorators');

export function getVueDecoratorValues(beanInstance) {
  if (!beanInstance[SymbolVueDecorators]) {
    beanInstance[SymbolVueDecorators] = shallowReactive({});
  }
  return beanInstance[SymbolVueDecorators];
}
