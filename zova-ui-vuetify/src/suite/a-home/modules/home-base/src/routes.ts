import ErrorNotFound from './.metadata/page/errorNotFound.vue';
import { IModuleRoute } from 'zova-module-a-router';

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
