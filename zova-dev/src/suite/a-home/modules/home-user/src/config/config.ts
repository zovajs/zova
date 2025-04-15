import type { ZovaSys } from 'zova';

export const config = (_sys: ZovaSys) => {
  return {
    passport: {
      accessToken: {
        expireTimeDelay: 2 * 60,
      },
    },
  };
};
