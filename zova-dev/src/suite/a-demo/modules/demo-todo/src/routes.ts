import Item from './.metadata/page/item.vue';
import Todo from './.metadata/page/todo.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'todo', component: Todo },
  { name: 'item', path: 'item/:id', component: Item },
];
