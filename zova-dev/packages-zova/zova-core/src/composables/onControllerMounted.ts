import { useContext } from './useContext.js';

export function onControllerMounted(fn: any) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  ctx.meta.hooks.onMounted(fn);
}
