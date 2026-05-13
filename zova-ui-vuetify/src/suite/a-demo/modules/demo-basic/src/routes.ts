import type { IModuleRoute } from 'zova-module-a-router';

import { ZPageComponent } from './.metadata/page/component.js';
import { ZPageState } from './.metadata/page/state.js';
import { ZPageStyle } from './.metadata/page/style.js';

export const routes: IModuleRoute[] = [
  { path: 'state', component: ZPageState, meta: { requiresAuth: false } },
  { path: 'component', component: ZPageComponent, meta: { requiresAuth: false } },
  { path: 'style', component: ZPageStyle, meta: { requiresAuth: false } },
];
