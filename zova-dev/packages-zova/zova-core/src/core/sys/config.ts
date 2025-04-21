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
    app: {
      name: env.APP_NAME,
      title: env.APP_TITLE,
      description: env.APP_DESCRIPTION,
      version: env.APP_VERSION,
      routerMode: env.APP_ROUTER_MODE,
      routerBase: env.APP_PUBLIC_PATH,
      publicPath: env.APP_PUBLIC_PATH,
      pageLogin: env.APP_PAGE_LOGIN,
      pageHome: env.APP_PAGE_HOME,
    },
    api: {
      baseURL: process.env.SERVER ? (env.SSR_API_BASE_URL || env.API_BASE_URL) : env.API_BASE_URL,
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
      server: {
        protocol: env.SSR_PROD_PROTOCOL,
        host: env.SSR_PROD_HOST || `localhost:${env.SSR_PROD_PORT}`,
      },
    },
    logger,
    locale: {
      default: env.APP_LOCALE_DEFAULT,
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
  app: {
    name: string;
    title: string;
    description: string;
    version: string;
    routerMode: 'hash' | 'history' | 'abstract' | undefined;
    routerBase: string;
    publicPath: string;
    pageLogin: string;
    pageHome: string;
  };
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
    server: {
      protocol: string;
      host: string;
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
