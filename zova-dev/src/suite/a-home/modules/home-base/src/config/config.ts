import type { ZovaSys } from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    layout: {
      sidebar: {
        width: 360,
      },
      navbar: {
        height: 132,
      },
    },
  };
};
