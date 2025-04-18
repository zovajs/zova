import type { FunctionAsync } from '../decorator/type/functionable.js';
import { onServerPrefetch } from 'vue';
import { useContext } from './useContext.js';

const SymbolPrefetches = Symbol('SymbolPrefetches');

export async function onControllerPrefetch(fn: FunctionAsync<void>) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  if (!ctx[SymbolPrefetches]) {
    ctx[SymbolPrefetches] = [];
    onServerPrefetch(async () => {
      const prefetches = ctx[SymbolPrefetches];
      for (const fn of prefetches) {
        await ctx.util.instanceScope(fn);
      }
      ctx[SymbolPrefetches] = undefined;
    });
  }
  ctx[SymbolPrefetches].push(fn);
}
