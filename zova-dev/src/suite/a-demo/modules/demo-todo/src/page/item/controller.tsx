import { BeanControllerPageBase, Use, useComputed, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTodo } from '../../model/todo.js';
import { ServiceTodoGetParams } from '../../service/todo.js';
import { ZPage } from 'zova-module-home-base';

export const ControllerPageItemSchemaParams = zz.object({
  id: zz.string(),
});
export const ControllerPageItemSchemaQuery = zz.object({});

@Controller()
export class ControllerPageItem extends BeanControllerPageBase {
  @Use()
  $$modelTodo: ModelTodo;
  currentTodo?: ServiceTodoGetParams;

  protected async __init__() {
    this.currentTodo = useComputed(() => {
      return { id: this.$params.id };
    });
  }

  protected render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <ZPage>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-info">
            <div>Current: {todoCurrent?.data?.title}</div>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
      </ZPage>
    );
  }
}
