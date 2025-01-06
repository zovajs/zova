import { BeanControllerPageBase, Use, uuid } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTodo } from '../../model/todo.js';
import { ServiceTodoEntity, ServiceTodoGetParams } from '../../service/todo.js';

@Controller()
export class ControllerPageTodo extends BeanControllerPageBase {
  @Use()
  $$modelTodo: ModelTodo;
  newTitle: string;
  currentTodo?: ServiceTodoGetParams;

  protected async __init__() {
    // todos
    const queryTodos = this.$$modelTodo.select();
    await queryTodos.suspense();
    if (queryTodos.error) throw queryTodos.error;
  }

  async addTodo() {
    const todo = {
      id: uuid(),
      title: this.newTitle,
      done: false,
    };
    await this.$$modelTodo.insert().mutateAsync(todo);
    this.newTitle = '';
  }

  async completeTodo(item: ServiceTodoEntity) {
    const todo = { ...item, title: `${item.title}!`, done: true };
    await this.$$modelTodo.update().mutateAsync(todo);
  }

  async deleteTodo(item: ServiceTodoEntity) {
    await this.$$modelTodo.delete().mutateAsync({ id: item.id });
  }
}
