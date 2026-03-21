import type { CustomRefFactory } from 'vue';

import { customRef } from 'vue';

export function useCustomRef<T>(factory: CustomRefFactory<T>): T {
  return customRef(factory) as T;
}
