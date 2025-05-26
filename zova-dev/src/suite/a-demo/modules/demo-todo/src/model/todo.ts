import type { ApiTodoIntertBody, ApiTodoUpdateBody } from '../api/todo.js';
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

  findOne(id?: string) {
    if (!id) return undefined;
    return this.$useStateData({
      queryKey: ['findOne', id],
      queryFn: async () => {
        return this.scope.api.todo.findOne(id);
      },
    });
  }

  create() {
    return this.$useMutationData<void, ApiTodoIntertBody>({
      mutationKey: ['create'],
      mutationFn: async body => {
        return this.scope.api.todo.create(body);
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['findAll'] });
      },
    });
  }

  update(id: string) {
    return this.$useMutationData<void, ApiTodoUpdateBody>({
      mutationKey: ['update', id],
      mutationFn: async body => {
        return this.scope.api.todo.update(id, body);
      },
      onSuccess: (_data, _params) => {
        this.$invalidateQueries({ queryKey: ['findAll'] });
        this.$invalidateQueries({ queryKey: ['findOne', id] });
      },
    });
  }

  delete(id: string) {
    return this.$useMutationData<void>({
      mutationKey: ['delete', id],
      mutationFn: async () => {
        return this.scope.api.todo.delete(id);
      },
      onSuccess: (_data, _params) => {
        this.$invalidateQueries({ queryKey: ['findAll'] });
        this.$invalidateQueries({ queryKey: ['findOne', id] });
      },
    });
  }
}
