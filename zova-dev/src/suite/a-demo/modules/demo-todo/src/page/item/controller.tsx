import { BeanControllerPageBase, Use, useComputed, zz } from 'zova';
import { Local } from 'zova-module-a-bean';
import { ModelTodo } from '../../model/todo.js';
import { ServiceTodoGetParams } from '../../service/todo.js';

const ParamsSchema = zz.object({
  id: zz.string(),
});
const QuerySchema = zz.object({});

@Local()
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

export interface ControllerPageItem {
  $params: ControllerPageItem.ParamsOutput;
  $query: ControllerPageItem.QueryOutput;
}

export namespace ControllerPageItem {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
