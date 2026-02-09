import type { ZovaSys } from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    tabs: {
      scene: '',
      max: 6,
      maxItems: 6,
      cache: true,
    },
  };
};
