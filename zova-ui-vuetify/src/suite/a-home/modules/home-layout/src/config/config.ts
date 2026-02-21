import type { ZovaSys } from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    layout: {
      sidebar: {
        width: 360,
      },
      navbar: {
        height: 112,
      },
    },
    tabs: {
      scene: '',
      max: 6,
      maxItems: 6,
      cache: true,
    },
  };
};
