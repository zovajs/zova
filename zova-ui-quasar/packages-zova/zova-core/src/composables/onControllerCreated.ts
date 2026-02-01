import { useContext } from './useContext.js';

export const SymbolCreatedFns = Symbol('SymbolCreatedFns');

export function onControllerCreated(fn: any) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  ctx.meta.hooks.onCreated(fn);
}
