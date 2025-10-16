import type { ZovaSys } from 'zova';

export const config = (sys: ZovaSys) => {
  return {
    cookieThemeName: sys.env.SSR_COOKIE_THEME === 'true',
    cookieThemeDarkDefault: sys.env.SSR_COOKIE_THEMEDARK_DEFAULT === 'true',
    optimization: {
      bodyReadyObserver: sys.env.SSR_BODYREADYOBSERVER === 'true',
    },
  };
};
