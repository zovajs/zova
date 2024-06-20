import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { StoreTodo } from '../../bean/store.todo.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageTodo extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$todo: StoreTodo;
  todoQeury;

  protected async __init__() {
    const list = await this.scope.service.todo.select();
    console.log(list.length);
    const item = await this.scope.service.todo.get({ id: 'xxx' });
    console.log(item);
    this.todoQeury = this.$$todo.select();
  }

  protected __dispose__() {}
}
