import type { IModuleRoute } from 'zova-module-a-router';
import { ZPageLogin } from './.metadata/page/login.js';

export const routes: IModuleRoute[] = [
  //
  {
    path: 'login',
    component: ZPageLogin,
    meta: {
      layout: 'empty',
      requiresAuth: false,
    },
  },
];
