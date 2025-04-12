import type { IIconInfo } from '../types/icon.js';
import { ref, watchEffect } from 'vue';
import { sys } from 'zova';

export function getZovaIcon(iconName?: string): IIconInfo | undefined {
  return sys.meta.$icon.parseIconInfoSync(iconName);
}

export function useZovaIcon(iconGetter: () => string | undefined) {
  const iconInfo = ref<IIconInfo>();

  watchEffect(() => {
    iconInfo.value = getZovaIcon(iconGetter());
  });

  return { iconInfo };
}
