import type { ZovaApplication } from '../core/index.js';
import { getCurrentInstance } from 'vue';

export function useApp(): ZovaApplication {
  const instance = getCurrentInstance();
  return instance?.appContext.app.zova as ZovaApplication;
}
