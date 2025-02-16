import type { IModuleRoute } from 'zova-module-a-router';
import Login from './.metadata/page/login.vue';

export const routes: IModuleRoute[] = [
  //
  {
    path: 'login',
    component: Login,
    meta: {
      layout: 'empty',
      requiresAuth: false,
    },
  },
];
