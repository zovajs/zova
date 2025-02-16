import type { IModuleRoute } from 'zova-module-a-router';
import ErrorNotFound from './.metadata/page/errorNotFound.vue';

export const routes: IModuleRoute[] = [
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
    meta: {
      absolute: true,
      layout: 'empty',
      requiresAuth: false,
    },
  },
  { path: 'errorNotFound', component: ErrorNotFound },
];
