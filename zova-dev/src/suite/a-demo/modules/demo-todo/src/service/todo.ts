import { BeanServiceBase, Service } from 'zova-module-a-api';

export interface ServiceTodoEntity {
  id: string;
  title: string;
  done: boolean;
}

export interface ServiceTodoGetParams {
  id: string;
}

export type ServiceTodoDeleteParams = ServiceTodoGetParams;
export type ServiceTodoIntertParams = ServiceTodoEntity;
export type ServiceTodoUpdateParams = ServiceTodoEntity;

@Service()
export class ServiceTodo extends BeanServiceBase {
  select() {
    return this.$api.get<any, ServiceTodoEntity[]>('/demo/todo/select');
  }
  get(params: ServiceTodoGetParams) {
    return this.$api.get<any, ServiceTodoEntity>('/demo/todo/get', { params });
  }
  insert(params: ServiceTodoIntertParams) {
    return this.$api.post<any, void, ServiceTodoIntertParams>('/demo/todo/insert', params);
  }
  update(params: ServiceTodoUpdateParams) {
    return this.$api.post<any, void, ServiceTodoUpdateParams>('/demo/todo/update', params);
  }
  delete(params: ServiceTodoDeleteParams) {
    return this.$api.post<any, void, ServiceTodoDeleteParams>('/demo/todo/delete', params);
  }
}
