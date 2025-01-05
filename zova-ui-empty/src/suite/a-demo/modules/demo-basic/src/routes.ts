import Component from './.metadata/page/component.vue';
import State from './.metadata/page/state.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'state', component: State },
  { path: 'component', component: Component },
];
