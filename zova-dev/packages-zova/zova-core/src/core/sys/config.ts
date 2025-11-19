import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { TypeComponentAppRecord, TypeComponentLayoutRecord } from '../../bean/resource/component/type.js';
import type { ILocaleRecord } from '../../bean/resource/locale/type.js';
import type { ZovaConfigRoutes } from '../../bean/resource/page/type.js';
import type { IBeanScopeConfig } from '../../bean/type.js';
import type { ZovaConfigEnv } from '../../types/utils/env.js';
import type { PowerPartial } from '../../types/utils/powerPartial.js';
import type { ConfigLogger } from '../logger/types.js';
import { cast } from '../../types/utils/cast.js';
import { combineLoggerDefault } from '../logger/loggerDefault.js';

export function configDefault(env: ZovaConfigEnv): PowerPartial<ZovaConfig> {
  // logger
  const logger = combineLoggerDefault();
  const config: PowerPartial<ZovaConfig> = {
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
      publicPath: env.APP_PUBLIC_PATH,
    },
    api: {
      baseURL: process.env.SERVER ? (env.SSR_API_BASE_URL || env.API_BASE_URL) : env.API_BASE_URL,
      prefix: env.API_PREFIX,
      jwt: env.API_JWT !== 'false',
    },
    ssr: {
      server: {
        protocol: env.SSR_PROD_PROTOCOL,
        host: env.SSR_PROD_HOST || `localhost:${env.SSR_PROD_PORT}`,
      },
    },
    logger,
    locale: {
      default: env.APP_LOCALE_DEFAULT as keyof ILocaleRecord | undefined,
      storeKey: 'locale',
      items: {
        'en-us': 'English',
        'zh-cn': 'Chinese',
      },
    },
    layout: {
      component: {
        app: 'a-app:app' as keyof TypeComponentAppRecord,
        default: 'home-layout:layoutDefault' as keyof TypeComponentLayoutRecord,
        empty: 'home-layout:layoutEmpty' as keyof TypeComponentLayoutRecord,
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
  };
  cast(config).onions = {};
  return config;
}

export interface ZovaConfig {
  meta: ZovaConfigMeta;
  app: {
    name: string;
    title: string;
    description: string;
    version: string;
    publicPath: string;
  };
  api: {
    baseURL: string;
    prefix: string;
    jwt: boolean;
  };
  ssr: {
    server: {
      protocol: string;
      host: string;
    };
  };
  logger: ConfigLogger;
  locale: {
    default: keyof ILocaleRecord;
    storeKey: string;
    items: Record<keyof ILocaleRecord, string>;
  };
  layout: {
    component: {
      app: keyof TypeComponentAppRecord;
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
