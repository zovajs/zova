import type { ZovaApplication } from 'zova';
import type { IIconInfo } from '../types/icon.js';
import { ref, watchEffect } from 'vue';
import { useApp } from 'zova';

export function getZovaIcon(iconName?: string, app?: ZovaApplication): IIconInfo | undefined {
  if (!app) app = useApp();
  return app.meta.icon.parseIconInfoSync(iconName);
}

export function useZovaIcon(iconGetter: () => string | undefined) {
  const iconInfo = ref<IIconInfo>();
  const app = useApp();

  watchEffect(() => {
    iconInfo.value = getZovaIcon(iconGetter(), app);
  });

  return { iconInfo };
}
