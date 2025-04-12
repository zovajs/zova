import type { ZovaConfigOptional, ZovaSys } from 'zova';

export default function (_sys: ZovaSys) {
  const config: ZovaConfigOptional = {
    layout: {
      sidebar: {
        leftOpenPC: true,
        breakpoint: 1023,
      },
    },
  };

  // modules
  config.modules = {};

  return config;
}
