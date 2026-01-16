import type { ZovaSys } from 'zova';
import type { ModelTabsOptionsBase } from 'zova-module-a-routertabs';

export type TypeConfigTabs = ModelTabsOptionsBase & { scene: string };
export interface IConfig { tabs: TypeConfigTabs }

export const config = (_sys: ZovaSys) => {
  const config: IConfig = {
    tabs: {
      scene: '',
      max: 6,
      maxItems: 6,
      cache: true,
    },
  };
  return config;
};
