import type { IModuleRoute } from 'zova-module-a-router';
import { ZPageErrorNotFound } from './.metadata/page/errorNotFound.js';

export const routes: IModuleRoute[] = [
  {
    path: '/:catchAll(.*)*',
    component: ZPageErrorNotFound,
    meta: {
      absolute: true,
      layout: 'empty',
      requiresAuth: false,
    },
  },
  { path: 'errorNotFound', component: ZPageErrorNotFound },
];
