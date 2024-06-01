import { ZovaConfigEnv, ZovaConfigMeta, IBeanScopeConfig, ILocalInfos, PowerPartial } from '../../index.js';

export const configDefault = {
  meta: {},
  env: {},
  base: {
    locale: 'en-us',
    jwt: false,
  },
  api: {
    baseURL: '',
    prefix: '',
  },
  icon: {
    defaultModule: 'home-icon',
  },
  layout: {
    component: {
      default: 'home-layout:layoutDefault',
      empty: 'home-layout:layoutEmpty',
    },
  },
  locales: {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  },
  modules: {},
};

export type ZovaConfig = {
  meta: ZovaConfigMeta;
  env: ZovaConfigEnv;
  base: {
    locale: keyof ILocalInfos;
    jwt: boolean;
  };
  api: {
    baseURL: string;
    prefix: string;
  };
  icon: {
    defaultModule: string;
  };
  layout: {};
  locales: Record<keyof ILocalInfos, string>;
  modules: IBeanScopeConfig;
} & typeof configDefault;

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
