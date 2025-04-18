import type { FunctionAsync } from '../decorator/type/functionable.js';
import { useContext } from './useContext.js';

export const SymbolCreatedFns = Symbol('SymbolCreatedFns');

export async function onControllerCreated(fn: FunctionAsync<void>) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  if (!ctx[SymbolCreatedFns]) {
    ctx[SymbolCreatedFns] = [];
  }
  ctx[SymbolCreatedFns].push(fn);
}
