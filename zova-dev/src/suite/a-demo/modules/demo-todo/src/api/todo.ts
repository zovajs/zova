import { BeanApiBase, Api } from 'zova-module-a-api';

export interface ApiTodoEntity {
  id: string;
  title: string;
  done: boolean;
}

export interface ApiTodoGetParams {
  id: string;
}

export type ApiTodoDeleteParams = ApiTodoGetParams;
export type ApiTodoIntertParams = ApiTodoEntity;
export type ApiTodoUpdateParams = ApiTodoEntity;

@Api()
export class ApiTodo extends BeanApiBase {
  select() {
    return this.$fetch.get<any, ApiTodoEntity[]>('/demo/todo/select');
  }
  get(params: ApiTodoGetParams) {
    return this.$fetch.get<any, ApiTodoEntity>('/demo/todo/get', { params });
  }
  insert(params: ApiTodoIntertParams) {
    return this.$fetch.post<any, void, ApiTodoIntertParams>('/demo/todo/insert', params);
  }
  update(params: ApiTodoUpdateParams) {
    return this.$fetch.post<any, void, ApiTodoUpdateParams>('/demo/todo/update', params);
  }
  delete(params: ApiTodoDeleteParams) {
    return this.$fetch.post<any, void, ApiTodoDeleteParams>('/demo/todo/delete', params);
  }
}
