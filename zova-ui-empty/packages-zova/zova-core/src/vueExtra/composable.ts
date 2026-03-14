import type { UnwrapNestedRefs } from 'vue';
import type { Functionable } from '../decorator/type/functionable.js';

export type ReturnTypeComposable<Composable extends Functionable> = Composable extends (...args: any[]) => infer R
  ? UnwrapNestedRefs<R>
  : any;

export function useComposable<T extends Functionable>(composable: T, ...args: Parameters<T>): ReturnTypeComposable<T> {
  return composable(...args) as ReturnTypeComposable<T>;
}
