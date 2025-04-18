import type { FunctionAsync } from '../decorator/type/functionable.js';
import { useContext } from './useContext.js';

export async function onControllerMounted(fn: FunctionAsync<void>) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  await ctx.meta.state.mounted.wait();
  if (fn) {
    return await ctx.util.instanceScope(fn);
  }
}
