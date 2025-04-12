import type { ZovaConfigOptional, ZovaSys } from 'zova';

export default function (_sys: ZovaSys) {
  const config: ZovaConfigOptional = {};

  // routes
  config.routes = {
    path: {
      '/home/index': { alias: '/' },
    },
    name: {},
  };

  // modules
  config.modules = {};

  return config;
}
