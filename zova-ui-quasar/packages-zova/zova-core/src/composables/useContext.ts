import type { ZovaContext } from '../core/context/context.js';
import { getCurrentInstance } from 'vue';

export function useContext(): ZovaContext {
  const instance = getCurrentInstance();
  return instance?.zova as ZovaContext;
}
