import type { ZovaSys } from 'zova';
import type { IModuleConfigRouter } from '../types/router.js';

export const config = (sys: ZovaSys) => {
  const config: IModuleConfigRouter = {
    mode: sys.env.ROUTER_MODE,
    pageHome: sys.env.ROUTER_PAGE_HOME,
    pageLogin: sys.env.ROUTER_PAGE_LOGIN,
    keyReturnTo: sys.env.ROUTER_KEY_RETURNTO,
  };
  return config;
};
