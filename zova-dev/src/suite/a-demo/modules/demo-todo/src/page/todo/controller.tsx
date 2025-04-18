import type { ApiTodoEntity, ApiTodoGetParams } from '../../api/todo.js';
import { RouterLink } from '@cabloy/vue-router';
import { withModifiers } from 'vue';
import { BeanControllerPageBase, Use, uuid } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';
import { ModelTodo } from '../../model/todo.js';

@Controller()
export class ControllerPageTodo extends BeanControllerPageBase {
  @Use()
  $$modelTodo: ModelTodo;

  newTitle: string;
  currentTodo?: ApiTodoGetParams;

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

  async completeTodo(item: ApiTodoEntity) {
    const todo = { ...item, title: `${item.title}!`, done: true };
    await this.$$modelTodo.update().mutateAsync(todo);
  }

  async deleteTodo(item: ApiTodoEntity) {
    await this.$$modelTodo.delete().mutateAsync({ id: item.id });
  }

  protected render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    const todos = this.$$modelTodo.select();
    return (
      <ZPage>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-success">
            <div>
              Current:
              {' '}
              <RouterLink to={this.$router.getPagePath('').resolveName('demo-todo:item', { params: { id: todoCurrent?.data?.id } })}>
                {todoCurrent?.data?.title}
              </RouterLink>
            </div>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
        <form>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body flex-row">
              <input type="text" class="input input-bordered w-full max-w-xs" v-model={this.newTitle}></input>
              <button
                class="btn btn-primary"
                type="submit"
                onClick={withModifiers(() => {
                  this.addTodo();
                }, ['prevent'])}
              >
                Create
              </button>
            </div>
          </div>
        </form>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Done</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todos.data?.map(item => {
                return (
                  <tr>
                    <td>
                      <a
                        class="link link-primary"
                        href="#"
                        onClick={withModifiers(() => {
                          this.currentTodo = { id: item.id };
                        }, ['prevent'])}
                      >
                        {item.title}
                      </a>
                    </td>
                    <td>{item.done && <input type="checkbox" checked={true} class="checkbox checkbox-success" />}</td>
                    <td>
                      <button
                        class="btn btn-error btn-sm"
                        onClick={() => {
                          this.deleteTodo(item);
                        }}
                      >
                        Delete
                      </button>
                      {!item.done && (
                        <button
                          class="btn btn-success btn-sm"
                          onClick={() => {
                            this.completeTodo(item);
                          }}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ZPage>
    );
  }
}
