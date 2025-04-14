import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { TypeComponentLayoutRecord } from '../../bean/resource/component/type.js';
import type { ILocalInfos } from '../../bean/resource/locale/type.js';
import type { ZovaConfigRoutes } from '../../bean/resource/page/type.js';
import type { IBeanScopeConfig } from '../../bean/type.js';
import type { ZovaConfigEnv } from '../../types/utils/env.js';
import type { PowerPartial } from '../../types/utils/powerPartial.js';
import type { ConfigLogger } from '../logger/types.js';
import { cast } from '../../types/utils/cast.js';
import { combineLoggerDefault } from '../logger/loggerDefault.js';

export function configDefault(env: ZovaConfigEnv) {
  // logger
  const logger = combineLoggerDefault();
  return {
    meta: {
      flavor: cast(env).META_FLAVOR,
      mode: cast(env).META_MODE,
      appMode: cast(env).META_APP_MODE,
    },
    api: {
      baseURL: cast(env).SERVER ? env.SSR_API_BASE_URL : env.API_BASE_URL,
      prefix: env.API_PREFIX,
      jwt: env.API_JWT !== 'false',
    },
    ssr: {
      cookieThemeName: env.SSR_COOKIE_THEMENAME === 'true',
      cookieThemeDark: env.SSR_COOKIE_THEMEDARK === 'true',
      cookieThemeDarkDefault: env.SSR_COOKIE_THEMEDARK_DEFAULT === 'true',
      optimization: {
        bodyReadyObserver: env.SSR_BODYREADYOBSERVER === 'true',
      },
    },
    logger,
    locale: {
      default: 'en-us',
      storeKey: 'locale',
      items: {
        'en-us': 'English',
        'zh-cn': 'Chinese',
      },
    },
    layout: {
      component: {
        default: 'home-layout:layoutDefault',
        empty: 'home-layout:layoutEmpty',
      },
      sidebar: {
        leftOpenPC: true,
        breakpoint: 1023,
      },
    },
    routes: {
      path: {},
      name: {},
    },
    modules: {},
    onions: {},
  };
}

export interface ZovaConfig {
  meta: ZovaConfigMeta;
  api: {
    baseURL: string;
    prefix: string;
    jwt: boolean;
  };
  ssr: {
    cookieThemeName: boolean;
    cookieThemeDark: boolean;
    cookieThemeDarkDefault: boolean;
    optimization: {
      bodyReadyObserver: boolean;
    };
  };
  logger: ConfigLogger;
  locale: {
    default: keyof ILocalInfos;
    storeKey: string;
    items: Record<keyof ILocalInfos, string>;
  };
  layout: {
    component: {
      default: keyof TypeComponentLayoutRecord;
      empty: keyof TypeComponentLayoutRecord;
    };
    sidebar: {
      leftOpenPC: boolean;
      breakpoint: number;
    };
  };
  routes: ZovaConfigRoutes;
  modules: IBeanScopeConfig;
}

export type ZovaConfigOptional = PowerPartial<ZovaConfig>;
