import { BeanControllerPageBase, zz } from 'zova';
import { Local } from 'zova-module-a-bean';

const ParamsSchema = zz.object({});

const QuerySchema = zz.object({
  tabName: zz.string().optional().default('boolean'),
  private: zz.boolean().optional(),
  user: zz
    .json({
      name: zz.string(),
      age: zz.number(),
    })
    .optional(),
  todos: zz
    .array(
      zz.object({
        title: zz.string(),
        done: zz.boolean(),
      }),
    )
    .optional(),
});

@Local()
export class ControllerPageRouteQuery2 extends BeanControllerPageBase {
  togglePrivate() {
    const _private = this.$query.private ? false : true;
    const query = { ...this.$query, private: _private };
    const url = this.$router.resolvePath('/demo/basic/routeQuery2', query);
    this.$router.push(url);
  }

  toggleUser() {
    const user = this.$query.user?.name === 'tom' ? { name: 'kevin', age: 18 } : { name: 'tom', age: 6 };
    const query = { ...this.$query, user };
    const url = this.$router.resolvePath('/demo/basic/routeQuery2', query);
    this.$router.push(url);
  }

  toggleTodos() {
    const todo =
      (this.$query.todos?.length ?? 0) % 2 === 0 ? { title: 'Running', done: false } : { title: 'Eating', done: true };
    const todos = this.$query.todos ? [todo].concat(this.$query.todos) : [todo];
    const query = { ...this.$query, todos };
    const url = this.$router.resolvePath('/demo/basic/routeQuery2', query);
    this.$router.push(url);
  }

  toggleTab(event, tabName: string) {
    const checked = event.target.checked;
    if (!checked) return;
    const query = { ...this.$query, tabName };
    const url = this.$router.resolvePath('/demo/basic/routeQuery2', query);
    this.$router.push(url);
  }
}

export interface ControllerPageRouteQuery2 {
  $params: ControllerPageRouteQuery2.ParamsOutput;
  $query: ControllerPageRouteQuery2.QueryOutput;
}

export namespace ControllerPageRouteQuery2 {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
