import { Api, BeanApiBase } from 'zova-module-a-api';

export interface ApiTodoEntity {
  id: string;
  title: string;
  done: boolean;
}

export type ApiTodoIntertBody = ApiTodoEntity;
export type ApiTodoUpdateBody = ApiTodoEntity;

@Api()
export class ApiTodo extends BeanApiBase {
  findAll() {
    return this.$fetch.get<any, ApiTodoEntity[]>('/demo/todo');
  }

  findOne(id: string) {
    return this.$fetch.get<any, ApiTodoEntity>('/demo/todo/{id}', { params: { id } });
  }

  create(body: ApiTodoIntertBody) {
    return this.$fetch.post<any, void, ApiTodoIntertBody>('/demo/todo/insert', body);
  }

  update(id: string, body: ApiTodoUpdateBody) {
    return this.$fetch.patch<any, void, ApiTodoUpdateBody>('/demo/todo/update', body, { params: { id } });
  }

  delete(id: string) {
    return this.$fetch.delete<any, void>('/demo/todo/delete', { params: { id } });
  }
}
