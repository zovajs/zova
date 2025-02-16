import type { IModuleRoute } from 'zova-module-a-router';
import Component from './.metadata/page/component.vue';
import Legacy from './.metadata/page/legacy.vue';
import Locale from './.metadata/page/locale.vue';
import Pinia from './.metadata/page/pinia.vue';
import RouteParams from './.metadata/page/routeParams.vue';
import RouteQuery from './.metadata/page/routeQuery.vue';
import RouteQueryB from './.metadata/page/routeQueryB.vue';
import State from './.metadata/page/state.vue';
import Style from './.metadata/page/style.vue';

export const routes: IModuleRoute[] = [
  { path: 'state', component: State },
  { path: 'component', component: Component },
  { path: 'locale', component: Locale },
  { path: 'style', component: Style },
  { path: 'pinia', component: Pinia },
  { path: 'routeQuery', component: RouteQuery },
  { name: 'routeParams', path: 'routeParams/:id?', component: RouteParams },
  { path: 'routeQueryB', component: RouteQueryB },
  { path: 'legacy', component: Legacy },
];
