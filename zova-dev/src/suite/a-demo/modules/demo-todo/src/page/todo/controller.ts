import { BeanControllerPageBase, Use, uuid, zz } from 'zova';
import { Local } from 'zova-module-a-bean';
import { ModelTodo } from '../../bean/model.todo.js';
import { ServiceTodoEntity, ServiceTodoGetParams } from '../../service/todo.js';

const ParamsSchema = zz.object({});
const QuerySchema = zz.object({});

@Local()
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

export interface ControllerPageTodo {
  $params: ControllerPageTodo.ParamsOutput;
  $query: ControllerPageTodo.QueryOutput;
}

export namespace ControllerPageTodo {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
