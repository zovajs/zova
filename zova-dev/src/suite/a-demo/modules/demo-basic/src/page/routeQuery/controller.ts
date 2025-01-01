import { BeanControllerPageBase, Local, zz } from 'zova';

const ParamsSchema = zz.object({});

const QuerySchema = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});

@Local()
export class ControllerPageRouteQuery extends BeanControllerPageBase {
  protected async __init__() {}
}

export interface ControllerPageRouteQuery {
  $params: ControllerPageRouteQuery.ParamsOutput;
  $query: ControllerPageRouteQuery.QueryOutput;
}

export namespace ControllerPageRouteQuery {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
