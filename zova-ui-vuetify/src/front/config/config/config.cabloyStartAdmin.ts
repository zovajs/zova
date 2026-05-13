import type { ZovaConfigOptional, ZovaSys } from 'zova';

export default function (_sys: ZovaSys) {
  const config: ZovaConfigOptional = {};

  // routes
  config.routes = {
    path: {
      ['/start/login' as any]: { alias: '/login' },
    },
    name: {},
  };

  return config;
}
