import type { ApiTodoDeleteParams, ApiTodoGetParams, ApiTodoIntertParams, ApiTodoUpdateParams } from '../api/todo.js';
import { BeanModelBase, Model } from 'zova-module-a-model';

@Model()
export class ModelTodo extends BeanModelBase {
  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        return this.scope.api.todo.select();
      },
    });
  }

  get(params?: ApiTodoGetParams) {
    if (!params) return undefined;
    return this.$useQueryExisting({
      queryKey: ['get', params.id],
      queryFn: async () => {
        return this.scope.api.todo.get(params);
      },
    });
  }

  insert() {
    return this.$useMutationExisting<void, ApiTodoIntertParams>({
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
    return this.$useMutationExisting<void, ApiTodoUpdateParams>({
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
    return this.$useMutationExisting<void, ApiTodoDeleteParams>({
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
