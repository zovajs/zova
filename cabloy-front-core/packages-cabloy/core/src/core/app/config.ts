import { CabloyConfigEnv, CabloyConfigMeta, IBeanScopeConfig, ILocalInfos, PowerPartial } from '../../index.js';

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
    defaultModule: 'a-homeicon',
  },
  layout: {
    component: {
      default: 'a-homelayout:layoutDefault',
      empty: 'a-homelayout:layoutEmpty',
    },
  },
  locales: {
    'en-us': 'English',
    'zh-cn': 'Chinese',
  },
  modules: {},
};

export type CabloyConfig = {
  meta: CabloyConfigMeta;
  env: CabloyConfigEnv;
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
  modules: IBeanScopeConfig;
} & typeof configDefault;

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
