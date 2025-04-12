import type { ZovaSys } from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    tabs: {
      scene: '',
      max: 3,
      persister: true,
    },
  };
};
