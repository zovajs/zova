import type { IModuleRoute } from 'zova-module-a-router';
import Item from './.metadata/page/item.vue';
import Todo from './.metadata/page/todo.vue';

export const routes: IModuleRoute[] = [
  { path: 'todo', component: Todo },
  { name: 'item', path: 'item/:id', component: Item },
];
