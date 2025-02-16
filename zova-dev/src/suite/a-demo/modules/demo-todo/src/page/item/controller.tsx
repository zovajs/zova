import type { ApiTodoGetParams } from '../../api/todo.js';
import type { ModelTodo } from '../../model/todo.js';
import { z } from 'zod';
import { BeanControllerPageBase, Use, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';

export const ControllerPageItemSchemaParams = z.object({
  id: z.string(),
});
export const ControllerPageItemSchemaQuery = z.object({});

@Controller()
export class ControllerPageItem extends BeanControllerPageBase {
  @Use()
  $$modelTodo: ModelTodo;

  currentTodo?: ApiTodoGetParams;

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
            <div>
              Current:
              {todoCurrent?.data?.title}
            </div>
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
