import type { IModuleRoute } from 'zova-module-a-router';

import { ZPageComponent } from './.metadata/page/component.js';
import { ZPageState } from './.metadata/page/state.js';

export const routes: IModuleRoute[] = [
  { path: 'state', component: ZPageState },
  { path: 'component', component: ZPageComponent },
];
