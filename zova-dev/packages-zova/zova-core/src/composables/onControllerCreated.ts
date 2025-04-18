import { useContext } from './useContext.js';

export const SymbolCreatedFns = Symbol('SymbolCreatedFns');

export async function onControllerCreated(fn: any) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  if (!ctx[SymbolCreatedFns]) {
    ctx[SymbolCreatedFns] = [];
  }
  ctx[SymbolCreatedFns].push(fn);
}
