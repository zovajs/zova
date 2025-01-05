import Login from './.metadata/page/login.vue';
import { IModuleRoute } from 'zova-module-a-router';

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
