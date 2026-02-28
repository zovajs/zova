import type { ILocaleRecord, ZovaConfigOptional, ZovaSys } from 'zova';
import { colorizer, combine, errors, splatter, timestamp } from '@cabloy/logger';
import { formatLoggerConsole, formatLoggerFilter } from 'zova';

export default function (sys: ZovaSys) {
  const config: ZovaConfigOptional = {};
  const env = sys.env;

  // routes
  config.routes = {
    path: {
      '/home/index': { alias: '/' },
      '/home/user/login': { alias: '/login' },
      '/demo/todo/todo': { alias: '/todo' },
    },
    name: {
      'demo-todo:item': { alias: '/todo/:id' },
    },
  };

  // app
  config.app = {
    name: env.APP_NAME,
    title: env.APP_TITLE,
    description: env.APP_DESCRIPTION,
    version: env.APP_VERSION,
  };

  // api
  config.api = {
    baseURL: process.env.SERVER ? (env.SSR_API_BASE_URL || env.API_BASE_URL) : env.API_BASE_URL,
    prefix: env.API_PREFIX,
    jwt: env.API_JWT !== 'false',
  };

  // ws
  config.ws = {
    baseURL: config.api.baseURL?.replace('https://', 'wss://').replace('http://', 'ws://'),
    prefix: '/ws',
  };

  // ssr
  config.ssr = {
    server: {
      protocol: env.SSR_PROD_PROTOCOL,
      host: env.SSR_PROD_HOST || `localhost:${env.SSR_PROD_PORT}`,
    },
  };

  // locale
  config.locale = {
    default: env.APP_LOCALE_DEFAULT as keyof ILocaleRecord,
    cookieLocale: sys.env.SSR_COOKIE_LOCALE === 'true',
    storeKey: 'locale',
    items: {
      'en-us': 'English',
      'zh-cn': 'Chinese',
    },
  };

  // tz
  config.tz = {
    storeKey: 'tz',
  };

  // layout
  config.layout = {
    app: {
      component: 'a-app:app',
    },
    component: {
      empty: env.LAYOUT_COMPONENT_EMPTY,
      default: env.LAYOUT_COMPONENT_DEFAULT,
    },
    sidebar: {
      leftOpenPC: true,
      breakpoint: 1023,
    },
  };

  // logger
  config.logger = {
    base(this: ZovaSys, clientInfo) {
      return {
        format: combine(
          splatter(),
          errors({ stack: true }),
          timestamp(),
          formatLoggerFilter({ level: clientInfo.level, silly: true }),
          colorizer(),
          formatLoggerConsole(),
        ),
      };
    },
    clients: {
      default: {},
    },
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
