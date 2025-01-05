import { BeanControllerPageBase, Use, useComputed, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTodo } from '../../model/todo.js';
import { ServiceTodoGetParams } from '../../service/todo.js';

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
}
