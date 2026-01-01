import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { TypeComponentAppRecord, TypeComponentLayoutRecord } from '../../bean/resource/component/type.js';
import type { ILocaleRecord } from '../../bean/resource/locale/type.js';
import type { ZovaConfigRoutes } from '../../bean/resource/page/type.js';
import type { IBeanScopeConfig } from '../../bean/type.js';
import type { ZovaConfigEnv } from '../../types/utils/env.js';
import type { PowerPartial } from '../../types/utils/powerPartial.js';
import type { ConfigLogger } from '../logger/types.js';
import { cast } from '../../types/utils/cast.js';

export function configDefault(env: ZovaConfigEnv): PowerPartial<ZovaConfig> {
  const config: PowerPartial<ZovaConfig> = {
    meta: {
      flavor: cast(env).META_FLAVOR,
      mode: cast(env).META_MODE,
      appMode: cast(env).META_APP_MODE,
    },
  };
  return config;
}

export interface ZovaConfig {
  meta: ZovaConfigMeta;
  app: {
    name: string;
    title: string;
    description: string;
    version: string;
  };
  api: {
    baseURL: string;
    prefix: string;
    jwt: boolean;
  };
  ws: {
    baseURL: string;
    prefix: string;
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
  tz: {
    storeKey: string;
  };
  layout: {
    app: {
      component: keyof TypeComponentAppRecord;
    };
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
