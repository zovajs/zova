import type { ApiTodoDeleteParams, ApiTodoGetParams, ApiTodoIntertParams, ApiTodoUpdateParams } from '../api/todo.js';
import { BeanModelBase, Model } from 'zova-module-a-model';

@Model()
export class ModelTodo extends BeanModelBase {
  findAll() {
    return this.$useStateData({
      queryKey: ['findAll'],
      queryFn: async () => {
        return this.scope.api.todo.findAll();
      },
    });
  }

  get(params?: ApiTodoGetParams) {
    if (!params) return undefined;
    return this.$useStateData({
      queryKey: ['get', params.id],
      queryFn: async () => {
        return this.scope.api.todo.get(params);
      },
    });
  }

  insert() {
    return this.$useMutationData<void, ApiTodoIntertParams>({
      mutationKey: ['insert'],
      mutationFn: async params => {
        return this.scope.api.todo.insert(params);
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
      },
    });
  }

  update() {
    return this.$useMutationData<void, ApiTodoUpdateParams>({
      mutationKey: ['update'],
      mutationFn: async params => {
        return this.scope.api.todo.update(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
      },
    });
  }

  delete() {
    return this.$useMutationData<void, ApiTodoDeleteParams>({
      mutationKey: ['delete'],
      mutationFn: async params => {
        return this.scope.api.todo.delete(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
      },
    });
  }
}
